export enum EventType {
  GUESS_ITEMS_LOADING = 'GUESS_ITEMS_LOADING',
  SET_GUESS_ITEMS_PAGE = 'SET_GUESS_ITEMS_PAGE',
}

export interface IEvent {
  type: EventType;
}
