import { EventType } from './IEvent';

export interface IUserAuthenticatedEvent {
  type: EventType.USER_AUTHENTICATED;
  loggedIn: boolean;
}

export const userAuthenticatedEvent = (loggedIn: boolean): IUserAuthenticatedEvent => ({
  type: EventType.USER_AUTHENTICATED,
  loggedIn,
});
