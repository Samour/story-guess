import { EventType } from './IEvent';

export interface IGuessItemsLoadingEvent {
  type: EventType.GUESS_ITEMS_LOADING;
}

export const guessItemsLoadingEvent = (): IGuessItemsLoadingEvent => ({
  type: EventType.GUESS_ITEMS_LOADING,
});
