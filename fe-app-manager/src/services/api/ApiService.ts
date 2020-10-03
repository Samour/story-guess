import { RefreshTokenResponse } from '@story-guess/ts-shared/dtos/session';
import NotLoggedInException from '../../exceptions/NotLoggedInException';
import { ISession, ISessionStorageService } from './SessionStorageService';

interface IRequestOptions {
  noAuthentication: boolean;
}

export interface IApiService {
  buildUrl(path: string): Promise<URL>;
  invoke<T>(input: RequestInfo, init?: RequestInit, options?: IRequestOptions): Promise<T>;
}

interface IApiConfig {
  apiUrl: string;
}

export class ApiService implements IApiService {

  private config?: Promise<IApiConfig>;
  private inFlightRefresh?: Promise<string>;

  constructor(private readonly sessionStorageService: ISessionStorageService) { }

  private getConfig(): Promise<IApiConfig> {
    if (!this.config) {
      this.config = this.doInvoke('/config.json');
    }
    return this.config;
  }

  async buildUrl(path: string): Promise<URL> {
    const { apiUrl } = await this.getConfig();
    return new URL(path, apiUrl);
  }

  private refreshAuthToken(): Promise<string> {
    const session: ISession | null = this.sessionStorageService.getCurrentSession();
    if (!session) {
      throw new NotLoggedInException();
    } else if (this.inFlightRefresh) {
      return this.inFlightRefresh;
    }

    this.inFlightRefresh = this.buildUrl('/session/refresh')
      .then(((url) => this.doInvoke<RefreshTokenResponse>(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(session),
      })))
      .then(({ token }) => {
        this.inFlightRefresh = undefined;
        return token;
      }).catch((e) => {
        this.sessionStorageService.clearSession();
        throw e;
      });
    return this.inFlightRefresh;
  }

  private async getAuthToken(): Promise<string> {
    const token = this.sessionStorageService.getToken();
    if (token) {
      return token;
    } else {
      return this.refreshAuthToken();
    }
  }

  async invoke<T>(input: RequestInfo, init?: RequestInit, options?: IRequestOptions): Promise<T> {
    if (options?.noAuthentication) {
      return this.doInvoke(input, init);
    }

    try {
      return await this.authInvokeWithoutRetry(input, init);
    } catch (e) {
      if (!(e instanceof NotLoggedInException)) {
        throw e;
      }
      await this.refreshAuthToken();
      return this.authInvokeWithoutRetry(input, init);
    }
  }

  private async authInvokeWithoutRetry<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
    const token = await this.getAuthToken();
    const headers = init?.headers || {};
    return this.doInvoke(input, {
      ...init,
      headers: {
        ...headers,
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  private async doInvoke<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
    const res = await fetch(input, init);
    if (res.status === 401 || res.status === 403) {
      throw new NotLoggedInException();
    }
    try {
      return await res.json();
    } catch (e) {
      return null as any;
    }
  }
}
