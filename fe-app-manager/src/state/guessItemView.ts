import { GuessItemDto } from '@story-guess/ts-shared/dtos/guess/GuessItem';

export interface IGuessItemViewState {
  itemId: string | null;
  item: GuessItemDto | null;
}
