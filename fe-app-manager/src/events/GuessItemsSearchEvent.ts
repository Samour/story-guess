import { EventType } from './IEvent';

export interface IGuessItemsSearchEvent {
  type: EventType.GUESS_ITEMS_SEARCH;
  search: string;
}

export const guessItemsSearchEvent = (search: string): IGuessItemsSearchEvent => ({
  type: EventType.GUESS_ITEMS_SEARCH,
  search,
});
