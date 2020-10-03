import { Store } from 'redux';
import { memo } from '@story-guess/ts-shared/singleton';
import { IState } from '../state';
import { GuessItemsListService, IGuessItemsListService } from './GuessItemsListService';
import { ApiService, IApiService } from './api/ApiService';
import { IGuessItemApiService, GuessItemApiService } from './api/GuessItemApiService';
import { ISessionStorageService, LocalStorageEphemeralSessionStorageService } from './api/SessionStorageService';
import { ILogInService, LogInService } from './LogInService';

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

  getSessionStorageService: () => ISessionStorageService = memo(() => new LocalStorageEphemeralSessionStorageService());

  getApiService: () => IApiService = memo(() => new ApiService(this.getSessionStorageService()));

  getGuessItemApiService: () => IGuessItemApiService = memo(() => new GuessItemApiService(this.getApiService()));

  getLogInService: () => ILogInService = memo(() => new LogInService(
    this.store,
    this.getSessionStorageService(),
    this.getApiService(),
  ));

  getGuessItemsListService: () => IGuessItemsListService = memo(() =>
    new GuessItemsListService(this.store, this.getGuessItemApiService())
  );
}

export const initialise = (store: Store<IState>): ServicesManager => ServicesManager.initialise(store);

export const getManager = (): ServicesManager => ServicesManager.getInstance();
