export interface IApiService {
  buildUrl(path: string): URL;
  invoke<T>(input: RequestInfo, init?: RequestInit): Promise<T>;
}

export class ApiService implements IApiService {

  buildUrl(path: string): URL {
    return new URL(path);
  }

  async invoke<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
    const res = await fetch(input, init);
    return res.json();
  }
}
