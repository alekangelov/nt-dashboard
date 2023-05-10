import { createStoredSignal } from '@utils/stored';
import { Accessor, createRoot, onMount, Setter } from 'solid-js';
export interface ShortCut {
  url: string;
  title?: string;
}

export type SearchEngine = 'Google' | 'DuckDuckGo' | 'Bing' | 'Yahoo' | 'Baidu';

export interface Settings {
  user?: {
    avatar: string;
    name: string;
    email: string;
  };
  shortcuts: Array<ShortCut>;
  search: {
    engine: SearchEngine;
  };
}

const getUsernameFromEmail = (email: string) => {
  return email.split('@')[0];
};

const getEmailFromChrome = async () => {
  return new Promise<chrome.identity.UserInfo>((resolve) => {
    chrome.identity.getProfileUserInfo((info) => {
      resolve(info);
    });
  });
};

function createSettings(): [Accessor<Settings>, Setter<Settings>] {
  const [settings, setSettings] = createStoredSignal<Settings>(
    {
      shortcuts: [],
      search: { engine: 'Google' },
    },
    'settings'
  );
  onMount(() => {
    if (!settings().user) {
      getEmailFromChrome().then((info) => {
        setSettings((prev) => ({
          ...prev,
          user: {
            ...prev.user,
            avatar: prev.user?.avatar ?? '',
            email: info.email ?? '',
            name: getUsernameFromEmail(info.email) ?? '',
          },
        }));
      });
    }
  });
  return [settings, setSettings];
}

export const useSettings = createRoot(createSettings);
