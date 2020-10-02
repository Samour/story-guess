import { PageResponse } from '../../../ts-shared/dtos/page';
import { GuessItemDto } from '../../../ts-shared/dtos/guess/GuessItem';

export interface IGuessItemsListState {
  loading: boolean;
  page?: PageResponse<GuessItemDto>;
}
