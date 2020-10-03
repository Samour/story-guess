import { EventType } from './IEvent';

export interface IUpdateViewGuessItemHintTextEvent {
  type: EventType.UPDATE_VIEW_GUESS_ITEM_HINT_TEXT;
  hintId: string;
  text: string;
}

export const updateViewGuessItemHintTextEvent = (hintId: string, text: string): IUpdateViewGuessItemHintTextEvent => ({
  type: EventType.UPDATE_VIEW_GUESS_ITEM_HINT_TEXT,
  hintId,
  text,
});
