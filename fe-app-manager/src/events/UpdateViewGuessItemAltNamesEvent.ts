import { EventType } from './IEvent';

export interface IUpdateViewGuessItemAltNamesEvent {
  type: EventType.UPDATE_VIEW_GUESS_ITEM_ALT_NAMES;
  alternateNames: string[];
}

export const updateViewGuessItemAltNamesEvent = (alternateNames: string[]): IUpdateViewGuessItemAltNamesEvent => ({
  type: EventType.UPDATE_VIEW_GUESS_ITEM_ALT_NAMES,
  alternateNames,
});
