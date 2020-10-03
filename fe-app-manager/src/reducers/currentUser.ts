import { EventType, IEvent } from '../events/IEvent';
import { IUserAuthenticatedEvent } from '../events/UserAuthenticatedEvent';
import { ICurrentUserState } from '../state/currentUser';

const initialState: ICurrentUserState = {
  loggedIn: false,
};

export default function (state: ICurrentUserState | undefined, event: IEvent): ICurrentUserState {
  state = state || initialState;
  if (event.type === EventType.USER_AUTHENTICATED) {
    const { loggedIn } = event as IUserAuthenticatedEvent;
    return {
      ...state,
      loggedIn,
    };
  } else {
    return state;
  }
}
