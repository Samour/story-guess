export interface IHandler {
  <T>(action: () => Promise<T>): Promise<T>;
}
