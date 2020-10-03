import { EventType } from './IEvent';

export interface IUpdateViewGuessItemTitleEvent {
  type: EventType.UPDATE_VIEW_GUESS_ITEM_TITLE;
  title: string;
}

export const updateViewGuessItemTitleEvent = (title: string): IUpdateViewGuessItemTitleEvent => ({
  type: EventType.UPDATE_VIEW_GUESS_ITEM_TITLE,
  title,
});
