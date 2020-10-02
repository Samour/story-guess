import { IEvent } from '../../events/IEvent';
import { IGuessItemsTableConfig } from '../../state/config/guessItemsTable';

const initialState: IGuessItemsTableConfig = {
  colWidths: {
    answer: 500,
    category: 100,
  },
  pageSize: 25,
};

export default function (state: IGuessItemsTableConfig | undefined, event: IEvent): IGuessItemsTableConfig {
  return state || initialState;
}
