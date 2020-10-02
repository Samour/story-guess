export enum Category {
  MOVIE = 'MOVIE',
  TV_SHOW = 'TV_SHOW',
  BOOK = 'BOOK',
}

export interface ItemHintDto {
  id: string;
  level: number;
  text: string;
}

export interface GuessItemDto {
  id: string;
  category: Category;
  title: string;
  alternateNames: string[];
  hints: ItemHintDto[];
}
