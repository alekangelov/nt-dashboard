/* eslint-disable solid/reactivity */
import { JSX, onMount } from 'solid-js';
import { css } from 'solid-styled';
import { Transition } from 'solid-transition-group';
import { Spinner } from './Spinner';
import { animateIn, animateOut } from '@utils/animations';

export function Input(
  props: JSX.HTMLElementTags['input'] & {
    error?: string;
    label?: string;
    children?: JSX.Element;
    initialValue?: string;
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
  let ref: HTMLInputElement;
  onMount(() => {
    if (props.initialValue) ref.value = props.initialValue;
  });
  return (
    <div class="wrapper">
      <label for={props.id}>{props.label}</label>
      {props.children ?? <input {...props} ref={(x) => (ref = x)} />}
    </div>
  );
}

export function Button(
  props: JSX.HTMLElementTags['button'] & {
    children?: JSX.Element;
    icon?: JSX.Element;
    onClick?: () => void;
    mt?: boolean;
    loading?: boolean;
  }
) {
  css`
    .wrapper {
      width: max-content;
      margin-top: ${props.mt ? '24px' : '0px'};
    }
    button {
      position: relative;
      padding: 16px 24px;
      background: rgba(var(--color-accent), 1);
      color: white;
      border-radius: 12px;
      border: none;
      outline: none;
      cursor: pointer;
      transition: all 0.2s ease-out;
      font-size: 14px;
      font-weight: 600;
      width: max-content;
      &:hover {
        filter: brightness(1.1);
        box-shadow: 0px 14px 24px -12px rgba(0, 0, 0, 0.25);
      }

      &:focus {
        filter: brightness(1.1);
        box-shadow: 0px 14px 24px -12px rgba(0, 0, 0, 0.25);
        outline: 3px solid rgba(var(--color-accent), 0.5);
      }
      &:active {
        filter: brightness(0.9);
      }
    }
    .loading {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .children {
      opacity: 1;
      transition: all 0.2s ease-out;
    }
    .notVisible {
      opacity: 0;
    }
  `;
  return (
    <div class="wrapper">
      <button {...props}>
        <Transition onEnter={animateIn} onExit={animateOut}>
          {props.loading && (
            <div class="loading">
              <Spinner size={24} />
            </div>
          )}
        </Transition>
        <div
          classList={{
            notVisible: props.loading,
            children: true,
          }}
        >
          {props.children}
        </div>
      </button>
    </div>
  );
}
