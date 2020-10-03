export interface ISession {
  sessionId: string;
  sessionSecret: string;
}

export interface ISessionStorageService {
  storeSession(session: ISession, token: string): void;
  storeToken(token: string): void;
  getToken(): string | null;
  getCurrentSession(): ISession | null;
  clearSession(): void;
}

export class EphemeralSessionStorageService implements ISessionStorageService {

  private token: string | null = null;
  private session: ISession | null = null;

  storeSession(session: ISession, token: string): void {
    this.token = token;
    this.session = session;
  }

  storeToken(token: string): void {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  getCurrentSession(): ISession | null {
    return this.session;
  }

  clearSession(): void {
    this.token = null;
    this.session = null;
  }
}

const SESSION_KEY = 'userSession';

export class LocalStorageEphemeralSessionStorageService implements ISessionStorageService {

  private token: string | null = null;
  private session: ISession | null = null;

  private encodeData<T>(data: T): string {
    return btoa(JSON.stringify(data));
  }

  private decodeData<T>(data: string | null): T | null {
    if (!data) {
      return null;
    }
    return JSON.parse(atob(data));
  }

  storeSession(session: ISession, token: string): void {
    this.token = token;
    this.session = session;
    localStorage.setItem(SESSION_KEY, this.encodeData(session));
  }

  storeToken(token: string): void {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  getCurrentSession(): ISession | null {
    if (!this.session) {
      this.session = this.decodeData(localStorage.getItem(SESSION_KEY));
    }
    return this.session;
  }

  clearSession(): void {
    this.token = null;
    this.session = null;
    localStorage.removeItem(SESSION_KEY);
  }
}
