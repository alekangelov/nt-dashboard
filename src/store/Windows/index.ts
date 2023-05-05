import { createRoot } from 'solid-js';
import { createStore } from 'solid-js/store';
export type App = 'settings' | 'todos' | 'bookmarks';
export type Rect = {
  top: number;
  left: number;
  width: number;
  height: number;
};
type Window = {
  rect?: Rect;
  state?: 'minimized' | 'maximized' | 'normal';
};
type WindowStore = Partial<{
  [key in App]: Window;
}>;

function createWindows() {
  const [windows, setWindows] = createStore<WindowStore>({
    settings: {},
    todos: {},
    bookmarks: {},
  });
  const changeWindow = (app: App, rect: Window['rect']) => {
    setWindows(app, (prev: Window) => {
      return {
        rect: {
          ...prev?.rect,
          ...rect,
        },
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
      if (prev?.state === 'minimized') {
        return { ...prev, state: 'normal' };
      }
      if (prev?.state === 'normal' || prev?.state === 'maximized') {
        return { ...prev, state: 'minimized' };
      }
      const addition = 0;
      const width = window.innerWidth / 2;
      const height = window.innerHeight / 2;
      const top = window.innerHeight / 2 - height / 2 + addition;
      const left = window.innerWidth / 2 - width / 2 + addition;
      const rect = { top, left, width, height };
      return { rect, state: 'normal' };
    });
  };
  const changeState = (app: App, state: Window['state']) => {
    setWindows(app, (prev) => {
      return {
        ...prev,
        state,
      };
    });
  };
  return {
    windows,
    setWindows,
    changeWindow,
    closeWindow,
    openWindow,
    changeState,
  };
}

export default createRoot(createWindows);
