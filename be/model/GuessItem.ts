import { Category } from '../../ts-shared/dtos/guess/GuessItem';

export interface IItemHint {
  id: string;
  level: number;
  text: string;
}

export interface IGuessItem {
  _id: string;
  category: Category;
  title: string;
  alternateNames: string[];
  hints: IItemHint[];
  createdAt: Date;
  updatedAt: Date;
}
