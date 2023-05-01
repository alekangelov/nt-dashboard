import { searchSettings } from '@utils/search';
import { createSignal, For } from 'solid-js';
import { css } from 'solid-styled';
import { SearchEngine } from '../../store';

const easing = 'cubic-bezier(0.22, 0.61, 0.36, 1)';

function Search() {
  const [focused, setFocused] = createSignal(false);
  const [value, setValue] = createSignal('');
  css`
    .search {
      width: 512px;
      height: 64px;
      border: 1px solid rgba(var(--color-surface), 0.2);
      background: linear-gradient(
        to bottom right,
        rgba(var(--color-surface), 0.25),
        rgba(var(--color-surface), 0.05)
      );
      border-radius: 24px;
      position: relative;
      backdrop-filter: blur(14px);
      transition: 0.2s box-shadow ${easing};
      .label {
        position: absolute;
        top: 50%;
        left: 24px;
        transform: translate(0, -50%);
        z-index: 1;
        color: rgba(var(--color-surface), 0.5);
        transition: 0.2s opacity ${easing};
        span {
          pointer-events: none;
        }
      }
      select {
        all: unset;
        cursor: pointer;
        option {
          color: rgba(var(--color-on-surface), 1);
          background: rgba(var(--color-surface), 1);
          padding: 8px 16px;
        }
      }

      input {
        width: 100%;
        height: 100%;
        border: none;
        background: none;
        position: absolute;
        top: 0;
        left: 0;
        outline: none;
        color: rgba(255, 255, 255, 1);
        padding: 0 24px;
        font-weight: 900;
        letter-spacing: -0.5px;
        font-size: 16px;
      }
      &.focused,
      &.hasValue {
        box-shadow: 0px 24px 48px -24px rgba(0, 0, 0, 0.5),
          0px 0px 0px 2px rgba(255, 255, 255, 0.2);
        .label {
          opacity: 0;
          pointer-events: none;
        }
      }
    }
  `;
  let ref: HTMLInputElement;
  return (
    <form
      class="search"
      classList={{ focused: focused(), hasValue: Boolean(value()) }}
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const engine = formData.get('engine') as SearchEngine;
        const query = formData.get('q') as string;
        searchSettings[engine](query);
      }}
    >
      <div class="label" onClick={() => ref.focus()}>
        <span>Search via </span>
        <select name="engine">
          <For each={Object.keys(searchSettings)}>
            {(item) => <option value={item}>{item}</option>}
          </For>
        </select>
      </div>
      <input
        ref={(ref1) => (ref = ref1)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        value={value()}
        onChange={(e) => setValue(e.currentTarget.value)}
        aria-label="Search query"
        type="text"
        name="q"
      />
    </form>
  );
}

export function Clock() {
  const [time, setTime] = createSignal(new Date().toLocaleTimeString());
  setInterval(() => {
    setTime(new Date().toLocaleTimeString());
  }, 1000);
  css`
    .dash {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justiofy-content: center;
      flex-direction: column;
      gap: 24px;
    }
    .clock {
      font-size: 64px;
      font-weight: 900;
      color: rgba(255, 255, 255, 1);
    }
  `;
  return (
    <div class="dash">
      <div class="clock">{time()}</div>
      <Search />
    </div>
  );
}
