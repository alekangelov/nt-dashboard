import { createReducer } from 'typesafe-actions';
import { equals, includes, reject } from 'ramda';
import { AllActions, IState } from './rootReducerTypes';
import {
  addFavorite,
  removeFavorite,
  changeSettings,
  changeBookmarks,
  changeWeather,
  addTodo,
  removeTodo,
  changeTodo,
} from '../actions/rootActions';
import FavoriteModel from '../models/FavoriteModel';
import { changeFromListWhereId } from '../../../utils';

const initialState: IState = {
  settings: {
    name: '',
    city: '',
    country: '',
    theme: 'dark',
    degreeFormat: '',
    background: {
      url: '',
      opacity: 0,
    },
  },
  weather: {
    location: undefined,
    current_observation: undefined,
    forecasts: [],
  },
  bookmarks: [],
  todos: [],
  favorites: [],
};

const rootReducer = createReducer<IState, AllActions>(initialState)
  .handleAction(addFavorite, (state, action) => {
    const model = FavoriteModel(action.payload);
    if (!includes(model, state.favorites)) {
      return {
        ...state,
        favorites: [...state.favorites, model],
      };
    }
    return state;
  })
  .handleAction(removeFavorite, (state, action) => {
    // const model = FavoriteModel(action.payload);
    return {
      ...state,
      favorites: reject(equals(action.payload))(state.favorites),
    };
  })
  .handleAction(changeSettings, (state, action) => {
    console.log({
      ...state,
      settings: action.payload,
    });
    return {
      ...state,
      settings: action.payload,
    };
  })
  .handleAction(changeBookmarks, (state, action) => {
    return {
      ...state,
      bookmarks: action.payload,
    };
  })
  .handleAction(changeWeather, (state, action) => {
    return {
      ...state,
      weather: action.payload,
    };
  })
  .handleAction(addTodo, (state, action) => {
    return {
      ...state,
      todos: [...state.todos, action.payload],
    };
  })
  .handleAction(removeTodo, (state, action) => {
    return {
      ...state,
      todos: reject(equals(action.payload))(state.todos),
    };
  })
  .handleAction(changeTodo, (state, action) => {
    return {
      ...state,
      todos: changeFromListWhereId(action.payload)(state.todos),
    };
  });

export default rootReducer;
