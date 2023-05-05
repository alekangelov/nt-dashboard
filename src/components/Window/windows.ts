import { App } from '@stores/Windows';
import { JSX } from 'solid-js';
import Settings from './Settings';

export const AppWindows: Partial<Record<App, () => JSX.Element>> = {
  settings: Settings,
};
