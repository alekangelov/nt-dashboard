import { JSX } from 'solid-js';
import { css } from 'solid-styled';

export function Input(
  props: JSX.HTMLElementTags['input'] & {
    error?: string;
    label?: string;
    children?: JSX.Element;
  }
) {
  css`
    .wrapper {
      display: flex;
      flex-direction: column;
      margin-top: 24px;
    }

    label {
      margin-bottom: 6px;
    }
    input {
      max-width: 256px;
      padding: 12px 24px;
      border-radius: 12px;
      background: rgba(var(--color-on-surface), 0.05);
      border: 1px solid rgba(var(--color-on-surface), 0.05);
      outline: none;
      transition: all 0.2s ease;
      &:focus {
        box-shadow: 0px 15px 10px -10px rgba(var(--color-accent), 0.1);
        border-color: rgba(var(--color-accent), 0.1);
        background: rgba(var(--color-accent), 0.05);
      }
    }
  `;
  return (
    <div class="wrapper">
      <label for={props.id}>{props.label}</label>
      {props.children || <input {...(props as any)} />}
    </div>
  );
}
