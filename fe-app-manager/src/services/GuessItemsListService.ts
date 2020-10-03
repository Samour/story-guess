import { Store } from 'redux';
import { PageResponse } from '@story-guess/ts-shared/dtos/page';
import { GuessItemDto } from '@story-guess/ts-shared/dtos/guess/GuessItem';
import { setGuessItemsPageEvent } from '../events/SetGuessItemsPageEvent';
import { IState } from '../state';
import { guessItemsLoadingEvent } from '../events/GuessItemsLoadingEvent';
import { IGuessItemApiService } from './api/GuessItemApiService';
import { appHandler } from '../handlers';

export interface IGuessItemsListService {
  initialise(): Promise<void>;
}

export class GuessItemsListService implements IGuessItemsListService {

  constructor(private readonly store: Store<IState>, private readonly guessItemApiService: IGuessItemApiService) { }

  async initialise(): Promise<void> {
    await appHandler(this.store)(async () => {
      this.store.dispatch(guessItemsLoadingEvent());
      const page: PageResponse<GuessItemDto> = await this.guessItemApiService.getItems(
        0,
        this.store.getState().config.guessItemsTable.pageSize,
      );
      this.store.dispatch(setGuessItemsPageEvent(page));
    });
  }
}
