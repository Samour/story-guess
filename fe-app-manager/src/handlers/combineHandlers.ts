import { IHandler } from './IHandler';

const wrapHandler = (handler: IHandler) => (baseHandler: IHandler): IHandler => (a) => handler(() => baseHandler(a));

export default (handlers: IHandler[]): IHandler => {
  if (handlers.length === 0) {
    return (action) => action();
  }

  let handler = handlers[0];
  handlers.slice(1).forEach((h) => handler = wrapHandler(h)(handler));
  
  return handler;
};
