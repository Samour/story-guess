import { IEvent } from '../../events/IEvent';
import { IStrings } from '../../state/strings';

const initialState: IStrings = {
  appBar: {
    logOutBtn: 'Log out',
  },
  logInForm: {
    usernameField: 'Username',
    passwordField: 'Password',
    logInBtn: 'Log in',
    failureMessage: 'Username or password incorrect',
  },
  guessItemsList: {
    columns: {
      answer: 'Answer',
      category: 'Category',
    },
  },
};

export default function(state: IStrings | undefined, event: IEvent): IStrings {
  return initialState;
}
