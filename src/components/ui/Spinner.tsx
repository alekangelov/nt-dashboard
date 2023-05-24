import { css } from 'solid-styled';
import { createMemo } from 'solid-js';

export function Spinner(props: { size?: number }) {
  const sizes = createMemo(() => {
    const size = props.size ?? 24;
    return {
      main: `${size}px`,
      border: `${Math.ceil(size / 8)}px`,
    };
  });
  css`
    .loading {
      display: inline-block;
      width: ${sizes().main};
      height: ${sizes().main};
      border: ${sizes().border} solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: #fff;
      animation: spin 1s ease-in-out infinite;
      animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;
  return <div class="loading" />;
}
