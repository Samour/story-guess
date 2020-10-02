import { Store } from 'redux';
import { IState } from '../state';
import { GuessItemsListService, IGuessItemsListService } from './GuessItemsListService';
import { memo } from '../../../ts-shared/singleton';

class ServicesManager {

  private static instance: ServicesManager;

  static initialise(store: Store<IState>): ServicesManager {
    ServicesManager.instance = new ServicesManager(store);
    return ServicesManager.instance;
  }

  static getInstance(): ServicesManager {
    if (!ServicesManager.instance) {
      throw new Error('ServicesManager has not been initialised');
    }
    return ServicesManager.instance;
  }

  private constructor(private readonly store: Store<IState>) { }

  getGuessItemsListService: () => IGuessItemsListService = memo(() => new GuessItemsListService(this.store));
}

export const initialise = (store: Store<IState>): ServicesManager => ServicesManager.initialise(store);

export const getManager = (): ServicesManager => ServicesManager.getInstance();
