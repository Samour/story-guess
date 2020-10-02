import { IConfig } from './config';
import { IStrings } from './strings';
import { IGuessItemsListState } from './guessItemsList';

export interface IState {
  config: IConfig;
  strings: IStrings;
  guessItemsList: IGuessItemsListState;
}
