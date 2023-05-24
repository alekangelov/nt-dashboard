/* eslint-disable solid/reactivity */
import { useWindows } from '@stores/index';
import { App, Rect } from '@stores/Windows';
import { anim } from '@utils/index';
import { createEffect, createMemo, onCleanup, onMount, Show } from 'solid-js';
import { css } from 'solid-styled';
import { Transition } from 'solid-transition-group';
import { AppWindows } from './windows';

type P = {
  type: App;
  rect?: Rect;
  minimized?: boolean;
  maximized?: boolean;
};

export function Window(props: P) {
  let down = false;
  let resize = false;
  const { changeWindow, toggleState, closeWindow } = useWindows;
  const size = createMemo(() => {
    if (props.maximized) {
      return {
        radius: '0px',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
      };
    }
    return {
      radius: '16px',
      top: `${props.rect?.top ?? 0}px`,
      left: `${props.rect?.left ?? 0}px`,
      width: `${props.rect?.width ?? 0}px`,
      height: `${props.rect?.height ?? 0}px`,
    };
  });
  css`
    .wrapper {
      background: rgba(var(--color-surface), 0.25);
      position: fixed;
      top: ${size().top};
      left: ${size().left};
      width: ${size().width}
      height: ${size().height};
      box-shadow: 0px 24px 100px -50px rgba(0, 0, 0, 0.25);
      backdrop-filter: blur(16px);
      border-radius: ${size().radius};
      user-select: none;
        overflow: hidden;
    }
    .resize {
      position: absolute;
      width: 24px;
      height: 24px;
      cursor: nwse-resize;
      bottom: 0;
      right: 0;
    }
    .actions {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      gap: 8px;
      padding: 12px;
      button {
        width: 16px;
        height: 16px;
        padding: 0;
        margin: 0;
        border-radius: 50%;
        border: none;
        outline: none;
        cursor: pointer;
        transition: filter 0.2s ${anim};
        box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
        &:hover {
          filter: brightness(1.2);
        }
        &:active {
          filter: brightness(0.8);
        }
      }
      .close {
        background: #ff5f56;
      }
      .minimize {
        background: #ffbd2e;
      }
      .maximize {
        background: #27c93f;
      }

    }
          .content {
        height: 100%;
      }
  `;
  const handleMouseUp = (e: MouseEvent) => {
    down = false;
    resize = false;
  };
  const handleMouseDown = (e: MouseEvent) => {
    // make sure it's left click
    if (e.button !== 0) return;
    down = true;
    if ((e.target as HTMLElement)?.closest('.resize')) {
      resize = true;
    }
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (!down || !props.rect) return;
    const { movementX, movementY } = e;
    if (resize) {
      changeWindow(props.type, {
        ...props.rect,
        width: props.rect.width + movementX,

        height: props.rect.height + movementY,
      });
      return;
    }
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
  const Elem = AppWindows[props.type];
  return (
    <Transition
      use:solid-styled
      onEnter={(el, done) => {
        const a = el.animate(
          [
            { transform: 'scale(0.8) transform(0%,-10%)', opacity: 1 },
            { transform: 'scale(1) transform(0%,0%)', opacity: 1 },
          ],
          {
            duration: 0,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          }
        );
        void a.finished.then(() => done());
      }}
      onExit={(el, done) => {
        const a = el.animate(
          [
            { transform: 'scale(1) transform(0%,0%)', opacity: 1 },
            { transform: 'scale(0.8) transform(0%,-100%)', opacity: 0 },
          ],
          {
            duration: 0,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          }
        );
        void a.finished.then(() => done());
      }}
    >
      {!props.minimized && (
        <div
          draggable
          class="wrapper"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          <div class="content">{Elem?.()} </div>
          <div role="presentation" class="resize" />
          <div class="actions">
            <button
              aria-label="Minimize window"
              role="button"
              type="button"
              class="minimize"
              onClick={() => toggleState(props.type, 'minimized')}
            />
            <button
              aria-label="Maximize window"
              role="button"
              type="button"
              class="maximize"
              onClick={() => toggleState(props.type, 'maximized')}
            />
            <button
              aria-label="Close window"
              role="button"
              type="button"
              class="close"
              onClick={() => closeWindow(props.type)}
            />
          </div>
        </div>
      )}
    </Transition>
  );
}
