import { GuessItemStatus } from '@story-guess/ts-shared/dtos/guess/GuessItem';
import { EventType } from './IEvent';

export interface IUpdateViewGuessItemStatusEvent {
  type: EventType.UPDATE_VIEW_GUESS_ITEM_STATUS;
  status: GuessItemStatus;
}

export const updateViewGuessItemStatusEvent = (status: GuessItemStatus): IUpdateViewGuessItemStatusEvent => ({
  type: EventType.UPDATE_VIEW_GUESS_ITEM_STATUS,
  status,
});
