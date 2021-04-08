import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import storageFn from './helpers/storageFn';
import rootReducer from './reducers/rootReducer';

const persistConfig = {
  key: 'root',
  storage: storageFn,
};

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

// eslint-disable-next-line
export default () => {
  const middleware = [thunk].filter(Boolean);
  const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const enhancer = composeEnhancers(applyMiddleware(...middleware));

  const store = createStore(persistedReducer, enhancer);
  const persistor = persistStore(store);
  return { store, persistor };
};
