import { IEvent } from '../../events/IEvent';
import { IGuessItemsListStrings } from '../../state/strings/guessItemsList';

const initialState: IGuessItemsListStrings = {
  columns: {
    answer: 'Answer',
    category: 'Category',
  },
};

export default function (state: IGuessItemsListStrings | undefined, event: IEvent): IGuessItemsListStrings {
  return state || initialState;
}
