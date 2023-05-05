import { createMemo, createSignal, For, JSX } from 'solid-js';
import { css } from 'solid-styled';
import { FiList, FiSettings } from 'solid-icons/fi';
import { createPopperHandles, Popper } from '..';
import { App, useWindows } from '@stores/index';
import { anim } from '@utils/index';
interface DockIconProps {
  type: 'shortcut' | 'app' | 'separator';
  id?: string;
  icon?: JSX.Element;
  title?: string;
  href?: string;
}

function DockIcon(
  props: DockIconProps & { scale?: string; onOver?: VoidFunction }
) {
  const { popper, trigger } = createPopperHandles();
  const { openWindow, windows } = useWindows;
  const isOpen = createMemo(() => {
    return Boolean(
      props.type === 'app' && props.id && windows[props.id as App]?.rect
    );
  });
  css`
    .wrapper {
      position: relative;
      cursor: pointer;
      background: linear-gradient(
        to bottom right,
        rgba(var(--color-surface), 0.25),
        rgba(var(--color-surface), 0)
      );
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 16px;
      width: calc(48px * ${props.scale || '1'});
      height: calc(48px * ${props.scale || '1'});
      transition: height 0.2s ${anim}, width 0.2s ${anim},
        font-size 0.2s ${anim}, transform 0.2s ${anim};
      color: white;
      font-size: calc(24px * ${props.scale || '1'});
      border: 1px solid rgba(var(--color-surface), 0.2);
      aspect-ratio: 1 / 1;
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        transition: opacity 0.2s ${anim};
        opacity: 0;
        border-radius: 16px;
      }
      &:active {
        &:before {
          opacity: 0.2;
          transition: 0s;
        }
      }
    }
    .separator {
      height: 16px;
      background: rgba(var(--color-surface), 0.2);
      width: 1px;
    }
    .indicator {
      position: absolute;
      bottom: -8px;
      height: 4px;
      width: 4px;
      border-radius: 50%;
      background: rgba(var(--color-surface), 1);
      transition: opacity 0.2s ${anim};
      opacity: 0;
      &.open {
        opacity: 1;
      }
    }
  `;

  if (props.type === 'separator') {
    return <div class="separator" />;
  }
  return (
    <Popper content={props.title} {...popper}>
      <div
        classList={{ wrapper: true }}
        {...trigger}
        onClick={() => {
          if (props.type !== 'app') return;
          openWindow(props.id as App);
        }}
        onMouseEnter={(e) => {
          props.onOver?.();
          trigger.onMouseEnter(e);
        }}
        onMouseLeave={() => {
          trigger.onMouseLeave();
        }}
      >
        {props.icon}
        <div class="indicator" classList={{ open: isOpen() }} />
      </div>
    </Popper>
  );
}

const appIcons = [
  {
    type: 'app',
    id: 'todos',
    title: 'Todos',
    icon: <FiList />,
  },
  {
    type: 'app',
    id: 'bookmarks',
    title: 'Bookmarks',
  },
  {
    type: 'separator',
  },
  {
    type: 'app',
    id: 'settings',
    title: 'Settings',
    icon: <FiSettings />,
  },
] as const;

const exponentialFalloff = (current: number, selected: number | null) => {
  if (selected == null) return 1;
  const diff = Math.abs(current - selected);
  const rev = (100 * (10 - diff)) / 1000;
  return Math.max(1, rev + 0.25);
};

export function Dock() {
  const [over, setOver] = createSignal<number | null>(null);
  css`
    .dock {
      display: flex;
      gap: 8px;
      position: absolute;
      bottom: 16px;
      height: 84px;
      left: 50%;
      transform: translateX(-50%);
      padding: 16px;
      align-items: center;
      border: 1px solid rgba(var(--color-surface), 0.2);
      border-radius: 16px;
      background: linear-gradient(
        to bottom right,
        rgba(var(--color-surface), 0.25),
        rgba(var(--color-surface), 0)
      );
      backdrop-filter: blur(16px);
      box-shadow: 0px 16px 24px -24px rgba(0, 0, 0, 0.5);
    }
  `;
  return (
    <div class="dock" onMouseLeave={() => setOver(null)}>
      <For each={appIcons}>
        {(icon, index) => (
          <DockIcon
            {...icon}
            onOver={() => {
              setOver(index);
            }}
            scale={exponentialFalloff(index(), over()).toString()}
          />
        )}
      </For>
    </div>
  );
}
