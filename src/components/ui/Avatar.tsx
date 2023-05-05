import { createSignal, onMount } from 'solid-js';
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
    case 'md':
      return 32;
    case 'lg':
      return 48;
    case 'xl':
      return 64;
    case undefined:
      return 32;
  }
};

export function Avatar(props: { src?: string; name?: string; size?: Size }) {
  const initials = props.name ? getInitials(props.name) : undefined;
  const color = stc(initials ?? '');
  const [src, setSrc] = createSignal('');
  onMount(() => {
    if (!props.src) return;
    fetch(props.src).then((e) => {
      if (e.ok) setSrc(props.src ?? '');
    });
  });
  css`
    .wrapper {
      width: ${getSize(props.size) + 'px'};
      height: ${getSize(props.size) + 'px'};
      background: ${color};
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;
  return (
    <div class="wrapper">
      {src() ? <img src={src()} /> : <span>{initials}</span>}
    </div>
  );
}
