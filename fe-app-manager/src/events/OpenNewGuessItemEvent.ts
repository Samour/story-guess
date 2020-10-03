import { EventType } from './IEvent';

export interface IOpenNewGuessItemEvent {
  type: EventType.OPEN_NEW_GUESS_ITEM;
}

export const openNewGuessItemEvent = (): IOpenNewGuessItemEvent => ({
  type: EventType.OPEN_NEW_GUESS_ITEM,
});
