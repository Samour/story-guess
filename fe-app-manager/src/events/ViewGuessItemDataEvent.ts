import { GuessItemDto } from '@story-guess/ts-shared/dtos/guess/GuessItem';
import { EventType } from './IEvent';

export interface IViewGuessItemDataEvent {
  type: EventType.VIEW_GUESS_ITEM_DATA;
  item: GuessItemDto;
}

export const viewGuessItemDataEvent = (item: GuessItemDto): IViewGuessItemDataEvent => ({
  type: EventType.VIEW_GUESS_ITEM_DATA,
  item,
});
