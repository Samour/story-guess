import { Category } from '@story-guess/ts-shared/dtos/guess/GuessItem';
import { EventType } from './IEvent';

export interface IGuessItemsFilterCategoryEvent {
  type: EventType.GUESS_ITEMS_FILTER_CATEGORY;
  category: Category | 'ALL';
}

export const guessItemsFilterCategoryEvent = (category: Category | 'ALL'): IGuessItemsFilterCategoryEvent => ({
  type: EventType.GUESS_ITEMS_FILTER_CATEGORY,
  category,
});
