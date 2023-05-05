import { useWindows } from '@stores/index';
import { App, Rect } from '@stores/Windows';
import { createEffect, onCleanup, onMount, Show } from 'solid-js';
import { css } from 'solid-styled';
import { Transition } from 'solid-transition-group';

type P = {
  type: App;
  rect?: Rect;
  state?: 'minimized' | 'maximized' | 'normal';
};

const getIsOpen = (state?: 'minimized' | 'maximized' | 'normal') => {
  return Boolean(state && state !== 'minimized');
};

export function Window(props: P) {
  let down = false;
  const { changeWindow } = useWindows;
  css`
    .wrapper {
      background: rgba(var(--color-surface), 0.25);
      position: fixed;
      top: ${`${props.rect?.top}px`};
      left: ${`${props.rect?.left}px`};
      width: ${`${props.rect?.width}px`};
      height: ${`${props.rect?.height}px`};
      box-shadow: 0px 24px 100px -50px rgba(0, 0, 0, 0.25);
      backdrop-filter: blur(16px);
      border-radius: 16px;
      user-select: none;
    }
  `;
  const handleMouseUp = (e: MouseEvent) => {
    down = false;
  };
  const handleMouseDown = (e: MouseEvent) => {
    down = true;
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (!down || !props.rect) return;
    const { movementX, movementY } = e;
    changeWindow(props.type, {
      ...props.rect,
      top: props.rect.top + movementY,
      left: props.rect.left + movementX,
    });
  };
  createEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    onCleanup(() => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    });
  });
  return (
    <Transition
      onEnter={(el, done) => {
        const a = el.animate(
          [
            { transform: 'scale(0)', opacity: 1 },
            { transform: 'scale(1)', opacity: 1 },
          ],
          {
            duration: 200,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          }
        );
        a.finished.then(() => done());
      }}
      onExit={(el, done) => {
        const a = el.animate(
          [
            { transform: 'scale(1)', opacity: 1 },
            { transform: 'scale(0)', opacity: 1 },
          ],
          {
            duration: 200,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          }
        );
        a.finished.then(() => done());
      }}
    >
      {getIsOpen(props.state) && (
        <div
          draggable
          class="wrapper"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        ></div>
      )}
    </Transition>
  );
}
