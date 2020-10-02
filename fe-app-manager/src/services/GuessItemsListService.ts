import { Store } from 'redux';
import { Category } from '@ts-shared/dtos/guess/GuessItem';
import { setGuessItemsPageEvent } from '../events/SetGuessItemsPageEvent';
import { IState } from '../state';

export interface IGuessItemsListService {
  initialise(): Promise<void>;
}

export class GuessItemsListService implements IGuessItemsListService {

  constructor(private readonly store: Store<IState>) { }

  async initialise(): Promise<void> {
    this.store.dispatch(setGuessItemsPageEvent({
      items: [{
        id: '1',
        category: Category.BOOK,
        title: 'Rhythm of War',
        alternateNames: [],
        hints: [],
      }],
      total: 1,
      offset: 0,
      limit: 25,
    }));
  }
}