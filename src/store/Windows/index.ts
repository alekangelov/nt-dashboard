import { createRoot } from 'solid-js';
import { createStore } from 'solid-js/store';
const apps = ['settings', 'todos', 'bookmarks'] as const;
export type App = (typeof apps)[number];
export type Rect = {
  top: number;
  left: number;
  width: number;
  height: number;
};
type Window = {
  rect?: Rect;
  maximized?: boolean;
  minimized?: boolean;
};
type WindowStore = Partial<{
  [key in App]: Window;
}>;

const createRectCache = () => {
  const cache: Partial<Record<App, Rect>> = {};
  const cacheFromStorage = localStorage.getItem('rect-cache');
  if (cacheFromStorage) {
    try {
      const maybeCache = JSON.parse(cacheFromStorage) as Record<App, Rect>;
      if (maybeCache) {
        for (const [key, value] of Object.entries(maybeCache)) {
          cache[key as App] = value;
        }
      }
    } finally {
    }
  }
  return {
    cache,
    save: (newCache: Partial<Record<App, Rect>>) =>
      localStorage.setItem('rect-cache', JSON.stringify(newCache)),
  };
};

function createWindows() {
  const { cache, save } = createRectCache();
  const [windows, setWindows] = createStore<WindowStore>({});
  const changeWindow = (app: App, rect: Window['rect']) => {
    setWindows(app, (prev) => {
      save({ ...cache, [app]: rect });
      return {
        ...prev,
        rect,
      };
    });
  };
  const closeWindow = (app: App) => {
    setWindows(app, () => {
      return undefined;
    });
  };
  const openWindow = (app?: App) => {
    if (!app) return;
    setWindows(app, (prev) => {
      if (prev?.minimized) return { ...prev, minimized: false };

      let rect = cache[app];
      if (!rect) {
        const height = 400;
        const width = 600;
        const top = window.innerHeight / 2 - height / 2;
        const left = window.innerWidth / 2 - width / 2;
        rect = { top, left, width, height };
      }
      return { rect, state: 'normal' };
    });
  };

  const toggleState = (app: App, state: 'minimized' | 'maximized') => {
    setWindows(app, (prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [state]: !prev[state],
      };
    });
  };

  return {
    windows,
    setWindows,
    changeWindow,
    closeWindow,
    openWindow,
    toggleState,
  };
}

export default createRoot(createWindows);
