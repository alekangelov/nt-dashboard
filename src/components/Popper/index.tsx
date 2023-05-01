import { genId } from '@utils/index';
import { Accessor, createMemo, createSignal, JSX, ParentProps } from 'solid-js';
import { Portal } from 'solid-js/web';
import { css } from 'solid-styled';

export function Popper(
  props: ParentProps<{
    content?: JSX.Element;
    show?: Accessor<boolean>;
    id: string;
    element?: Accessor<{
      top: number;
      left: number;
      width: number;
      height: number;
    }>;
  }>
) {
  if (!props.content) return props.children;
  const pos = createMemo(() => {
    const elem = props.element?.();
    if (!elem) return { top: '0px', left: '0px' };
    return {
      left: `${elem.left + elem.width / 2}px`,
      top: `${elem.top - 8}px`,
    };
  });
  css`
    .popper {
      position: relative;
    }
    .popper__content {
      position: fixed;
      opacity: 0;
      left: ${pos().left};
      top: ${pos().top};
      transition: 0.2s transform cubic-bezier(0.22, 0.61, 0.36, 1),
        0.2s opacity cubic-bezier(0.22, 0.61, 0.36, 1);
      transform: translate(-50%, -75%);
      font-size: 12px;
      background: rgba(var(--color-surface), 0.8);
      box-shadow: 0px 4px 16px -4px rgba(0, 0, 0, 0.2);
      max-width: 200%;
      padding: 6px 12px;
      border-radius: 4px;
      backdrop-filter: blur(14px);
      pointer-events: none;
      &.shown {
        opacity: 1;
        transform: translate(-50%, -100%);
      }
    }
  `;

  return (
    <>
      <Portal mount={document.querySelector('#portal') as Element}>
        <div
          id={props.id}
          class="popper__content"
          classList={{ shown: props.show?.() }}
        >
          {props.content}
        </div>
      </Portal>
      {props.children}
    </>
  );
}

export function createPopperHandles(timeout = 100) {
  const [show, setShow] = createSignal(false);
  const [element, setElement] = createSignal({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  let timeoutId: number | null = null;
  const id = genId('popover');
  const setElem = (e: MouseEvent) => {
    if (e.target) {
      const rectPre = (e.target as any)
        ?.closest('[data-popper]')
        ?.getBoundingClientRect();
      const rect = {
        top: rectPre?.top,
        left: rectPre?.left,
        width: rectPre?.width,
        height: rectPre?.height,
      };
      setElement(rect);
    }
  };
  const onMouseEnter = (e: MouseEvent) => {
    if (timeoutId) clearTimeout(timeoutId);
    setElem(e);
    timeoutId = setTimeout(() => setShow(true), timeout);
  };
  const onMouseLeave = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setShow(false);
  };
  const onMouseMove = (e: MouseEvent) => {
    setElem(e);
  };

  return {
    trigger: {
      onMouseEnter,
      onMouseMove,
      onMouseLeave,
      'aria-labeledby': id,
      'data-popper': true,
    },
    popper: { show, element, id },
  };
}
