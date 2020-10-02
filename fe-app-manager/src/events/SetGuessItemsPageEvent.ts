import { GuessItemDto } from '../../../ts-shared/dtos/guess/GuessItem';
import { PageResponse } from '../../../ts-shared/dtos/page';
import { EventType } from './IEvent';

export interface ISetGuessItemsPageEvent {
  type: EventType.SET_GUESS_ITEMS_PAGE;
  page: PageResponse<GuessItemDto>;
}

export const setGuessItemsPageEvent = (page: PageResponse<GuessItemDto>): ISetGuessItemsPageEvent => ({
  type: EventType.SET_GUESS_ITEMS_PAGE,
  page,
});
