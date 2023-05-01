import { createStoredSignal } from '@utils/stored';
import { createRoot } from 'solid-js';

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

function createSettings() {
  return createStoredSignal<Settings>(
    {
      shortcuts: [],
      search: { engine: 'Google' },
    },
    'settings'
  );
}

export const useSettings = createRoot(createSettings);
