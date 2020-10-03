import { EventType } from './IEvent';

export interface ICloseGuessItemViewEvent {
  type: EventType.CLOSE_GUESS_ITEM_VIEW;
}

export const closeGuessItemViewEvent = (): ICloseGuessItemViewEvent => ({
  type: EventType.CLOSE_GUESS_ITEM_VIEW,
});
