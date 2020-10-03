import { EventType } from './IEvent';

export interface ILogInFormSetPasswordEvent {
  type: EventType.LOG_IN_FORM_SET_PASSWORD;
  password: string;
}

export const logInFormSetPasswordEvent = (password: string): ILogInFormSetPasswordEvent => ({
  type: EventType.LOG_IN_FORM_SET_PASSWORD,
  password,
});
