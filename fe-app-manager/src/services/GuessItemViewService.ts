import { Store } from 'redux';
import { GuessItemDto } from '@story-guess/ts-shared/dtos/guess/GuessItem';
import { appHandler } from '../handlers';
import { IState } from '../state';
import { IGuessItemApiService } from './api/GuessItemApiService';
import { viewGuessItemDataEvent } from '../events/ViewGuessItemDataEvent';
import { closeGuessItemViewEvent } from '../events/CloseGuessItemViewEvent';

export interface IGuessItemViewService {
  initialise(): Promise<void>;
  save(): Promise<void>;
}

export class GuessItemViewService implements IGuessItemViewService {

  constructor(private readonly store: Store<IState>, private readonly guessItemApiService: IGuessItemApiService) { }

  async initialise(): Promise<void> {
    const { itemId } = this.store.getState().guessItemView;
    if (!itemId) {
      return;
    }

    await appHandler(this.store)(async () => {
      const guessItem: GuessItemDto = await this.guessItemApiService.getItem(itemId);
      this.store.dispatch(viewGuessItemDataEvent(guessItem));
    });
  }

  async save(): Promise<void> {
    const { itemId, item } = this.store.getState().guessItemView;
    if (!itemId || !item) {
      return;
    }

    await appHandler(this.store)(async () => {
      await this.guessItemApiService.updateItem(itemId, item);
      this.store.dispatch(closeGuessItemViewEvent());
    });
  }
}
