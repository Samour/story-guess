import { PageResponse } from '@story-guess/ts-shared/dtos/page';
import { Category, GuessItemDto } from '@story-guess/ts-shared/dtos/guess/GuessItem';

export interface IGuessItemsListState {
  category: Category | 'ALL';
  search: string;
  loading: boolean;
  page?: PageResponse<GuessItemDto>;
}
