import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { IState } from './rootReducerTypes';

export { default as rootReducer } from './rootReducer';

export const useRootSelector: TypedUseSelectorHook<IState> = useSelector;
