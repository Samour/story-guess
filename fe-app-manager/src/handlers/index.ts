import { Store } from 'redux';
import { IState } from '../state';
import authenticationErrorHandler from './authenticationErrorHandler';
import combineHandlers from './combineHandlers';

export const appHandler = (store: Store<IState>) => combineHandlers([
  authenticationErrorHandler(store),
]);
