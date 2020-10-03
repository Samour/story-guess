import { v4 as uuid } from 'uuid';
import { ItemHintDto } from '@story-guess/ts-shared/dtos/guess/GuessItem';
import { EventType, IEvent } from '../events/IEvent';
import { IViewGuessItemDataEvent } from '../events/ViewGuessItemDataEvent';
import { IViewGuessItemEvent } from '../events/ViewGuessItemEvent';
import { IGuessItemViewState } from '../state/guessItemView';
import { Reducer } from 'redux';
import { IUpdateViewGuessItemTitleEvent } from '../events/UpdateViewGuessItemTitleEvent';
import { IUpdateViewGuessItemCategoryEvent } from '../events/UpdateViewGuessItemCategoryEvent';
import { IUpdateViewGuessItemAltNamesEvent } from '../events/UpdateViewGuessItemAltNamesEvent';
import { IUpdateViewGuessItemHintTextEvent } from '../events/UpdateViewGuessItemHintTextEvent';
import { IUpdateViewGuessItemHintLevelEvent } from '../events/UpdateViewGuessItemHintLevelEvent';
import { IViewGuessItemRemoveHintEvent } from '../events/ViewGuessItemRemoveHintEvent';

const initialState: IGuessItemViewState = {
  itemId: null,
  item: null,
};

const newHint = (): ItemHintDto => ({
  id: uuid(),
  text: '',
  level: 1,
});

const normaliseHints = (state: IGuessItemViewState): IGuessItemViewState => {
  if (!state.item) {
    return state;
  }
  if (!state.item.hints.length) {
    return {
      ...state,
      item: {
        ...state.item,
        hints: [newHint()],
      },
    };
  } else {
    return state;
  }
};

const normaliseLevel = (level: string): number => {
  const x = Number.parseInt(level);

  if (Number.isNaN(x)) {
    return null as any;
  }

  if (x < 1) {
    return 1;
  } else if (x > 3) {
    return 3;
  } else {
    return x;
  }
};

const postProcess = (processors: ((state: IGuessItemViewState) => IGuessItemViewState)[]) =>
  (reducer: Reducer<IGuessItemViewState>): Reducer<IGuessItemViewState> => {
    if (!processors.length) {
      return reducer;
    }

    let nextReducer: Reducer<IGuessItemViewState> = (s, e) => processors[0](reducer(s, e));
    processors.slice(1).forEach((p) => nextReducer = (s, e) => p(nextReducer(s, e)));

    return nextReducer;
  };

function reducer(state: IGuessItemViewState | undefined, event: IEvent): IGuessItemViewState {
  state = state || initialState;
  if (event.type === EventType.VIEW_GUESS_ITEM) {
    const { itemId } = event as IViewGuessItemEvent;
    return {
      ...state,
      itemId,
      item: null,
    };
  } else if (event.type === EventType.VIEW_GUESS_ITEM_DATA) {
    const { item } = event as IViewGuessItemDataEvent;
    return {
      ...state,
      item,
    };
  } else if (event.type === EventType.UPDATE_VIEW_GUESS_ITEM_TITLE) {
    if (!state.item) {
      return state;
    }
    const { title } = event as IUpdateViewGuessItemTitleEvent;
    return {
      ...state,
      item: {
        ...state.item,
        title,
      },
    };
  } else if (event.type === EventType.UPDATE_VIEW_GUESS_ITEM_CATEGORY) {
    if (!state.item) {
      return state;
    }
    const { category } = event as IUpdateViewGuessItemCategoryEvent;
    return {
      ...state,
      item: {
        ...state.item,
        category,
      },
    };
  } else if (event.type === EventType.UPDATE_VIEW_GUESS_ITEM_ALT_NAMES) {
    if (!state.item) {
      return state;
    }
    const { alternateNames } = event as IUpdateViewGuessItemAltNamesEvent;
    return {
      ...state,
      item: {
        ...state.item,
        alternateNames,
      },
    };
  } else if (event.type === EventType.UPDATE_VIEW_GUESS_ITEM_HINT_TEXT) {
    if (!state.item) {
      return state;
    }
    const { hintId, text } = event as IUpdateViewGuessItemHintTextEvent;
    return {
      ...state,
      item: {
        ...state.item,
        hints: state.item.hints.map((h) => h.id === hintId ? {
          ...h,
          text,
        } : h),
      },
    };
  } else if (event.type === EventType.UPDATE_VIEW_GUESS_ITEM_HINT_LEVEL) {
    if (!state.item) {
      return state;
    }
    const { hintId, level } = event as IUpdateViewGuessItemHintLevelEvent;
    return {
      ...state,
      item: {
        ...state.item,
        hints: state.item.hints.map((h) => h.id === hintId ? {
          ...h,
          level: normaliseLevel(level),
        } : h),
      },
    };
  } else if (event.type === EventType.VIEW_GUESS_ITEM_ADD_HINT) {
    if (!state.item) {
      return state;
    }
    return {
      ...state,
      item: {
        ...state.item,
        hints: [
          ...state.item.hints,
          newHint(),
        ],
      },
    };
  } else if (event.type === EventType.VIEW_GUESS_ITEM_REMOVE_HINT) {
    if (!state.item) {
      return state;
    }
    const { hintId } = event as IViewGuessItemRemoveHintEvent;
    return {
      ...state,
      item: {
        ...state.item,
        hints: state.item.hints.filter(({ id }) => id !== hintId),
      },
    };
  } else if (event.type === EventType.CLOSE_GUESS_ITEM_VIEW) {
    return {
      ...state,
      itemId: null,
      item: null,
    };
  } else {
    return state;
  }
};

export default postProcess([normaliseHints])(reducer);
