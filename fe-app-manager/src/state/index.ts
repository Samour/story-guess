import { IConfig } from './config';
import { IStrings } from './strings';
import { ICurrentUserState } from './currentUser';
import { ILogInFormState } from './logInForm';
import { IGuessItemsListState } from './guessItemsList';

export interface IState {
  config: IConfig;
  strings: IStrings;
  currentUser: ICurrentUserState;
  logInForm: ILogInFormState;
  guessItemsList: IGuessItemsListState;
}
