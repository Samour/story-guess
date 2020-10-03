import { EventType } from './IEvent';

export interface IViewGuessItemEvent {
  type: EventType.VIEW_GUESS_ITEM;
  itemId: string;
}

export const viewGuessItemEvent = (itemId: string): IViewGuessItemEvent => ({
  type: EventType.VIEW_GUESS_ITEM,
  itemId,
});
