import { createSignal, createRoot } from 'solid-js';

export type App = 'settings' | 'todos' | 'bookmarks';
export type Rect = {
  top: number;
  left: number;
  width: number;
  height: number;
};
type Window = {
  rect: Rect;
};
type WindowStore = Partial<{
  [key in App]: Window;
}>;

function createWindows() {
  const [windows, setWindows] = createSignal<WindowStore>({});
  const changeWindow = (app: App, rect: Window['rect']) => {
    setWindows((prev) => {
      if (!prev[app]) prev[app] = { rect };
      prev[app] = { rect };
      return { ...prev };
    });
  };
  const closeWindow = (app: App) => {
    setWindows((prev) => {
      prev[app] = undefined;
      return { ...prev };
    });
  };
  const openWindow = (app?: App | string) => {
    if (!app) return;
    setWindows((prev) => {
      const addition = Object.values(prev).length * 16;
      const width = 512;
      const height = 600;
      const top = window.innerHeight / 2 - height / 2 + addition;
      const left = window.innerWidth / 2 - width / 2 + addition;
      const rect = { top, left, width, height };
      prev[app as App] = { rect };
      console.log(prev);
      return { ...prev };
    });
  };
  return { windows, setWindows, changeWindow, closeWindow, openWindow };
}

export default createRoot(createWindows);
