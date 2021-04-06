import { ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { createAction } from 'typesafe-actions';
import { Weather } from '../../../hooks/useWeather';
import {
  AllActions,
  Favorite,
  IState,
  Settings,
  RootReducerActionTypes,
  Todo,
} from '../reducers/rootReducerTypes';

export type ActionType = ActionCreator<
  ThunkAction<void, IState, null, AllActions>
>;

export const addFavorite = createAction(
  RootReducerActionTypes.ADD_FAVORITE,
)<Favorite>();

export const removeFavorite = createAction(
  RootReducerActionTypes.REMOVE_FAVORITE,
)<Favorite>();

export const changeSettings = createAction(
  RootReducerActionTypes.CHANGE_SETTINGS,
)<Settings>();

export const changeWeather = createAction(
  RootReducerActionTypes.CHANGE_WEATHER,
)<Weather.Response>();

export const changeBookmarks = createAction(
  RootReducerActionTypes.CHANGE_BOOKMARKS,
)<chrome.bookmarks.BookmarkTreeNode[]>();

export const addTodo = createAction(RootReducerActionTypes.ADD_TODO)<Todo>();

export const removeTodo = createAction(
  RootReducerActionTypes.REMOVE_TODO,
)<Todo>();

export const changeTodo = createAction(
  RootReducerActionTypes.CHANGE_TODO,
)<Todo>();
