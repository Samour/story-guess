import { EventType } from './IEvent';

export interface IViewGuessItemAddHintEvent {
  type: EventType.VIEW_GUESS_ITEM_ADD_HINT;
}

export const viewGuessItemAddHintEvent = (): IViewGuessItemAddHintEvent => ({
  type: EventType.VIEW_GUESS_ITEM_ADD_HINT,
});
