/* eslint-disable solid/reactivity */
import { FiEdit } from 'solid-icons/fi';
import { createEffect, createSignal } from 'solid-js';
import { css } from 'solid-styled';
import stc from 'string-to-color';

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((e) => e[0])
    .join('');
};

type Size = 'sm' | 'md' | 'lg' | 'xl';

const getSize = (size?: Size) => {
  switch (size) {
    case 'sm':
      return 24;
    case 'lg':
      return 48;
    case 'xl':
      return 64;
    default:
      return 32;
  }
};

export function Avatar(props: {
  src?: string;
  name?: string;
  size?: Size;
  onClick?: () => void;
}) {
  const initials = props.name ? getInitials(props.name) : undefined;
  const color = stc(initials ?? '');
  const [src, setSrc] = createSignal('');
  createEffect(() => {
    if (!props.src) return;
    if (props.src.includes('data')) {
      setSrc(props.src);
      return;
    }
    void fetch(props.src).then((e) => {
      if (e.ok) setSrc(props.src ?? '');
    });
  });
  css`
    .wrapper {
      width: ${`${getSize(props.size)}px`};
      height: ${`${getSize(props.size)}px`};
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
      }
      overflow: hidden;
      background: ${color};
      border-radius: ${`${getSize(props.size) / 4}px`};
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: ${props.onClick ? 'pointer' : 'default'};
      position: relative;
      box-shadow: 0px 0px 24px -25px rgba(0, 0, 0, 0);
      transition: all 0.2s ease-out;
      &.clickable {
        &:hover {
          box-shadow: 0px 10px 48px -6px rgba(0, 0, 0, 0.25);
          .overlay {
            opacity: 1;
          }
        }
        &:active {
          box-shadow: 0px 0px rgba(0, 0, 0, 0);
        }
      }
    }
    .overlay {
      opacity: 0;
      position: absolute;
      top: 8px;
      right: 8px;
      padding: 4px;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease-out;
      color: white;
      z-index: 10;
    }
  `;
  return (
    <div
      classList={{
        wrapper: true,
        clickable: !!props.onClick,
      }}
      onClick={props.onClick}
    >
      {props.onClick && (
        <div class="overlay">
          <FiEdit />
        </div>
      )}
      {src() ? <img src={src()} /> : <span>{initials}</span>}
    </div>
  );
}
