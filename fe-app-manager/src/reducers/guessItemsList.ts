import { IGuessItemsFilterCategoryEvent } from '../events/GuessItemsFilterCategoryEvent';
import { IGuessItemsSearchEvent } from '../events/GuessItemsSearchEvent';
import { EventType, IEvent } from '../events/IEvent';
import { ISetGuessItemsPageEvent } from '../events/SetGuessItemsPageEvent';
import { IGuessItemsListState } from '../state/guessItemsList';

const initialState: IGuessItemsListState = {
  category: 'ALL',
  search: '',
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
  } else if (event.type === EventType.GUESS_ITEMS_FILTER_CATEGORY) {
    const { category } = event as IGuessItemsFilterCategoryEvent;
    return {
      ...state,
      category,
    };
  } else if (event.type === EventType.GUESS_ITEMS_SEARCH) {
    const { search } = event as IGuessItemsSearchEvent;
    return {
      ...state,
      search,
    };
  } else {
    return state;
  }
}
