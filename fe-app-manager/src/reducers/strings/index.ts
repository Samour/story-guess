import { Category } from '@story-guess/ts-shared/dtos/guess/GuessItem';
import { IEvent } from '../../events/IEvent';
import { IStrings } from '../../state/strings';

const categoriesMap = new Map();
categoriesMap.set(Category.BOOK, 'Books');
categoriesMap.set(Category.MOVIE, 'Movies');
categoriesMap.set(Category.TV_SHOW, 'TV Shows');

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
  categories: {
    all: 'All',
    categories: categoriesMap,
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
