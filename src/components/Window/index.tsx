import { useWindows } from '@stores/index';
import { App, Rect } from '@stores/Windows';
import { anim } from '@utils/index';
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
  let resize = false;
  const { changeWindow, changeState, closeWindow } = useWindows;
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
  `;
  const handleMouseUp = (e: MouseEvent) => {
    down = false;
    resize = false;
  };
  const handleMouseDown = (e: MouseEvent) => {
    down = true;
    if ((e.target as HTMLElement)?.closest('.resize')) {
      resize = true;
    }
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (!down || !props.rect) return;
    const { movementX, movementY } = e;
    if (resize) {
      return changeWindow(props.type, {
        ...props.rect,
        width: props.rect.width + movementX,

        height: props.rect.height + movementY,
      });
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
        >
          <div role="presentation" class="resize" />
          <div class="actions">
            <button
              aria-label="Minimize window"
              role="button"
              type="button"
              class="minimize"
              onClick={() => changeState(props.type, 'minimized')}
            />
            <button
              aria-label="Maximize window"
              role="button"
              type="button"
              class="maximize"
              onClick={() => changeState(props.type, 'maximized')}
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
