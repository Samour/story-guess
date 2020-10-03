import { EventType } from './IEvent';

export interface IViewGuessItemRemoveHintEvent {
  type: EventType.VIEW_GUESS_ITEM_REMOVE_HINT;
  hintId: string;
}

export const viewGuessItemRemoveHintEvent = (hintId: string): IViewGuessItemRemoveHintEvent => ({
  type: EventType.VIEW_GUESS_ITEM_REMOVE_HINT,
  hintId,
});
