import { EventType, IEvent } from '../events/IEvent';
import { ISetGuessItemsPageEvent } from '../events/SetGuessItemsPageEvent';
import { IGuessItemsListState } from '../state/guessItemsList';

const initialState: IGuessItemsListState = {
  loading: true,
};

export default function (state: IGuessItemsListState | undefined, event: IEvent): IGuessItemsListState {
  state = state || initialState;
  if (event.type === EventType.GUESS_ITEMS_LOADING) {
    return {
      ...state,
      loading: true,
    };
  } else if (event.type === EventType.SET_GUESS_ITEMS_PAGE) {
    const { page } = event as ISetGuessItemsPageEvent;
    return {
      ...state,
      loading: false,
      page,
    };
  } else {
    return state;
  }
}
