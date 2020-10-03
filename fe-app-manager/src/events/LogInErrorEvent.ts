import { EventType } from './IEvent';

export interface ILogInErrorEvent {
  type: EventType.LOG_IN_ERROR;
  error: boolean;
}

export const logInErrorEvent = (error: boolean): ILogInErrorEvent => ({
  type: EventType.LOG_IN_ERROR,
  error,
});
