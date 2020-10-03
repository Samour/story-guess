import { Category } from '@story-guess/ts-shared/dtos/guess/GuessItem';
import { EventType } from './IEvent';

export interface IUpdateViewGuessItemCategoryEvent {
  type: EventType.UPDATE_VIEW_GUESS_ITEM_CATEGORY;
  category: Category;
}

export const updateViewGuessItemCategoryEvent = (category: Category): IUpdateViewGuessItemCategoryEvent => ({
  type: EventType.UPDATE_VIEW_GUESS_ITEM_CATEGORY,
  category,
});
