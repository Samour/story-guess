import { EventType } from './IEvent';

export interface IUpdateViewGuessItemHintLevelEvent {
  type: EventType.UPDATE_VIEW_GUESS_ITEM_HINT_LEVEL;
  hintId: string;
  level: string;
}

export const updateViewGuessItemHintLevelEvent = (hintId: string, level: string): IUpdateViewGuessItemHintLevelEvent => ({
  type: EventType.UPDATE_VIEW_GUESS_ITEM_HINT_LEVEL,
  hintId,
  level,
});
