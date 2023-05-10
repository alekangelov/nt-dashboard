import { Input } from '@components/ui';
import { Avatar } from '@components/ui';
import { useSettings } from '@stores/settings';
import { anim } from '@utils/index';
import { createTabber } from '@utils/tabber';
import { createMemo, JSX } from 'solid-js';
import { css } from 'solid-styled';
import { Transition } from 'solid-transition-group';

const arrToId = <T extends string[]>(arr: T) =>
  arr.map((e) => ({ id: e })) as { id: string }[];

const tabs = ['user', 'general', 'appearence', 'shortcuts', 'about'];

type Tab = (typeof tabs)[number];

const tabTitles = {
  user: 'User',
  general: 'General',
  appearence: 'Appearence',
  shortcuts: 'Shortcuts',
  about: 'About',
};

const UserTab = () => {
  css`
    .wrapper {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 12px;
      width: 100%;
    }
    span {
      font-weight: 600;
      color: white;
    }
  `;
  return (
    <div class="wrapper">
      <Avatar name="" size="lg" />
      <span>Username</span>
    </div>
  );
};

const DefaultTab = (props: { leading?: JSX.Element; id?: Tab }) => {
  css`
    .wrapper {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 12px;
      width: 100%;
    }
    span {
      color: white;
      font-weight: 600;
      &[rel='icon'] {
        font-size: 18px;
      }
    }
  `;
  return (
    <div class="wrapper">
      <span rel="icon" class="icon">
        {props.leading}
      </span>
      <span rel="title" class="title">
        {props.id ? (tabTitles[props.id] as any) : ''}
      </span>
    </div>
  );
};

const emojis: Record<Tab, string> = {
  general: '🔧',
  appearence: '🎨',
  shortcuts: '⌨️',
  about: '📄',
};

const tabPanels: Partial<Record<Tab, () => JSX.Element>> = {
  user: () => {
    const [settings, _setSettings] = useSettings;
    const user = createMemo(() => {
      return settings().user;
    });
    css`
      .profile {
        display: flex;
        align-items: center;
        gap: 12px;

        border-radius: 24px;
        padding: 24px;
        background: rgba(var(--color-on-surface), 0.05);
      }
    `;
    return (
      <div>
        <div class="profile">
          <Avatar size="xl" src={user()?.avatar} name={user()?.name} />
          <span>{user()?.name || '@unknown'}</span>
        </div>
        <form>
          <Input type="email" id="email" label="Email" name="email" />
        </form>
      </div>
    );
  },
};

const tabTabs: Partial<Record<Tab, () => JSX.Element>> = {
  user: UserTab,
  general: () => <DefaultTab leading={emojis['general']} id="general" />,
  appearence: () => (
    <DefaultTab leading={emojis['appearence']} id="appearence" />
  ),
  shortcuts: () => <DefaultTab leading={emojis['shortcuts']} id="shortcuts" />,
  about: () => <DefaultTab leading={emojis['about']} id="about" />,
};

function Settings() {
  const { Tabs, Panel } = createTabber(arrToId(tabs));
  css`
    .wrapper {
      display: flex;
      height: 100%;
    }
    .tabs {
      width: 33%;
      max-width: 316px;
      min-width: 128px;
    }
    .tabs-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      flex-direction: column;
      padding: 12px;
    }
    .tab {
      all: unset;
      width: 100%;
      box-sizing: border-box;
      padding: 12px;
      cursor: pointer;
      transition: all 0.2s ${anim};
      border-radius: 12px;
      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
      &[data-selected] {
        background: rgba(0, 0, 0, 0.2);
      }
    }
    .panel {
      background: rgba(var(--color-surface), 1);
      width: 100%;
      padding: 24px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    }
    h2 {
      font-size: 36px;
      margin-top: 0px;
    }
  `;
  return (
    <div class="wrapper">
      <div class="tabs">
        <Tabs class="tabs-wrapper" use:solid-styled>
          {(props) => {
            const MaybeElem = tabTabs[props.id];
            if (!MaybeElem) return null;
            return (
              <button
                class="tab"
                onClick={() => props.handleSelect()}
                {...props.props}
              >
                <MaybeElem />
              </button>
            );
          }}
        </Tabs>
      </div>
      <Panel class="panel" use:solid-styled>
        {(props) => {
          return (
            <Transition>
              {props.selected && (
                <div {...props.props}>
                  <h2>
                    {emojis[props.id]} {tabTitles[props.id]}
                  </h2>
                  <div class="content">
                    {tabPanels[props.id] ? tabPanels[props.id]() : null}
                  </div>
                </div>
              )}
            </Transition>
          );
        }}
      </Panel>
    </div>
  );
}

export default Settings;
