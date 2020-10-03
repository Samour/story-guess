import { EventType, IEvent } from '../events/IEvent';
import { ILogInErrorEvent } from '../events/LogInErrorEvent';
import { ILogInFormSetPasswordEvent } from '../events/LogInFormSetPasswordEvent';
import { ILogInFormSetUsernameEvent } from '../events/LogInFormSetUsernameEvent';
import { ILogInFormState } from '../state/logInForm';

const initialState: ILogInFormState = {
  username: '',
  password: '',
  error: false,
};

export default function (state: ILogInFormState | undefined, event: IEvent): ILogInFormState {
  state = state || initialState;
  if (event.type === EventType.LOG_IN_FORM_SET_USERNAME) {
    const { username } = event as ILogInFormSetUsernameEvent;
    return {
      ...state,
      username,
    };
  } else if (event.type === EventType.LOG_IN_FORM_SET_PASSWORD) {
    const { password } = event as ILogInFormSetPasswordEvent;
    return {
      ...state,
      password,
    };
  } else if (event.type === EventType.LOG_IN_ERROR) {
    const { error } = event as ILogInErrorEvent;
    return {
      ...state,
      error,
    };
  } else {
    return state;
  }
}
