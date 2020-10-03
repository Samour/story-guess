import { Store } from 'redux';
import { CreateSessionRequest, CreateSessionResponse } from '@story-guess/ts-shared/dtos/session';
import { IState } from '../state';
import { IApiService } from './api/ApiService';
import { ISessionStorageService } from './api/SessionStorageService';
import { userAuthenticatedEvent } from '../events/UserAuthenticatedEvent';
import { logInFormSetUsernameEvent } from '../events/LogInFormSetUsernameEvent';
import { logInFormSetPasswordEvent } from '../events/LogInFormSetPasswordEvent';
import { logInErrorEvent } from '../events/LogInErrorEvent';

export interface ILogInService {
  initialise(): void;
  logIn(): Promise<void>;
  logOut(): Promise<void>;
}

export class LogInService implements ILogInService {

  constructor(private readonly store: Store<IState>, private readonly sessionStorageService: ISessionStorageService,
    private readonly apiService: IApiService) { }

  initialise(): void {
    if (this.sessionStorageService.getCurrentSession()) {
      this.store.dispatch(userAuthenticatedEvent(true));
    }
  }

  async logIn(): Promise<void> {
    this.store.dispatch(logInErrorEvent(false));
    const url: URL = await this.apiService.buildUrl('/session');
    const { username, password } = this.store.getState().logInForm;
    const request: CreateSessionRequest = {
      loginId: username,
      password,
    };

    try {
      const { sessionId, sessionSecret, token }: CreateSessionResponse = await this.apiService.invoke(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      }, { noAuthentication: true });
      this.sessionStorageService.storeSession({ sessionId, sessionSecret }, token);
    } catch (e) {
      this.store.dispatch(logInErrorEvent(true));
      return;
    }

    this.store.dispatch(userAuthenticatedEvent(true));
    this.store.dispatch(logInFormSetUsernameEvent(''));
    this.store.dispatch(logInFormSetPasswordEvent(''));
  }

  async logOut(): Promise<void> {
    const url: URL = await this.apiService.buildUrl('/session/logout');
    await this.apiService.invoke(url.toString(), { method: 'POST' });
    this.sessionStorageService.clearSession();
    this.store.dispatch(userAuthenticatedEvent(false));
  }
}
