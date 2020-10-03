import { IAppBarStrings } from './appBar';
import { ICategoryStrings } from './categories';
import { IGuessItemsListStrings } from './guessItemsList';
import { IGuessItemViewStrings } from './guessItemView';
import { ILogInFormStrings } from './logInForm';

export interface IStrings {
  appBar: IAppBarStrings;
  logInForm: ILogInFormStrings;
  categories: ICategoryStrings;
  guessItemsList: IGuessItemsListStrings;
  guessItemView: IGuessItemViewStrings;
}
