import { Store } from 'redux';
import { userAuthenticatedEvent } from '../events/UserAuthenticatedEvent';
import NotLoggedInException from '../exceptions/NotLoggedInException';
import { IState } from '../state';
import { IHandler } from './IHandler';

export default (store: Store<IState>): IHandler => {
  return async <T>(action: () => Promise<T>): Promise<T> => {
    try {
      return await action();
    } catch (e) {
      if (e instanceof NotLoggedInException) {
        store.dispatch(userAuthenticatedEvent(false));
        return null as any;
      } else {
        throw e;
      }
    }
  };
};
