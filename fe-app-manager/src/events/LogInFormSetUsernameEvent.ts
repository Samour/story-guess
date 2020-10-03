import { EventType } from './IEvent';

export interface ILogInFormSetUsernameEvent {
  type: EventType.LOG_IN_FORM_SET_USERNAME;
  username: string;
}

export const logInFormSetUsernameEvent = (username: string): ILogInFormSetUsernameEvent => ({
  type: EventType.LOG_IN_FORM_SET_USERNAME,
  username,
});
