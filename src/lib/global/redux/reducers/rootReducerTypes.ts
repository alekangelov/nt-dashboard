import { Weather } from '../../../hooks/useWeather';

export enum RootReducerActionTypes {
  ADD_FAVORITE = '@DASHBOARD/ADD_FAVORITE',
  REMOVE_FAVORITE = '@DASHBOARD/REMOVE_FAVORITE',
  CHANGE_SETTINGS = '@DASHBOARD/CHANGE_SETTINGS',
  CHANGE_WEATHER = '@DASHBOARD/CHANGE_WEATHER',
  CHANGE_BOOKMARKS = '@DASHBOARD/CHANGE_BOOKMARKS',
  ADD_TODO = '@DASHBOARD/ADD_TODO',
  REMOVE_TODO = '@DASHBOARD/REMOVE_TODO',
  CHANGE_TODO = '@DASHBOARD/CHANGE_TODO',
}
export type AllActions =
  | {
      type: RootReducerActionTypes.ADD_FAVORITE;
      payload: Favorite;
    }
  | {
      type: RootReducerActionTypes.CHANGE_WEATHER;
      payload: Weather.Response;
    }
  | {
      type: RootReducerActionTypes.CHANGE_BOOKMARKS;
      payload: chrome.bookmarks.BookmarkTreeNode[];
    }
  | {
      type: RootReducerActionTypes.REMOVE_FAVORITE;
      payload: Favorite;
    }
  | {
      type: RootReducerActionTypes.ADD_TODO;
      payload: Todo;
    }
  | {
      type: RootReducerActionTypes.REMOVE_TODO;
      payload: Todo;
    }
  | {
      type: RootReducerActionTypes.CHANGE_TODO;
      payload: Todo;
    }
  | {
      type: RootReducerActionTypes.CHANGE_SETTINGS;
      payload: Settings;
    };

export interface Settings {
  name: string;
  city: string;
  country: string;
  theme: 'light' | 'dark';
  degreeFormat: string;
  background: {
    url?: string;
    opacity?: number;
  };
}

export interface Todo {
  id: string;
  content: string;
  done: boolean;
}

export interface Favorite {
  url: string;
  icon?: string;
}

export interface IState {
  readonly settings: Settings;
  readonly favorites: Favorite[];
  readonly weather: Weather.Response;
  readonly bookmarks: chrome.bookmarks.BookmarkTreeNode[];
  readonly todos: Todo[];
}
