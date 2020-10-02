import { Collection } from 'mongodb';
import { Category } from '../../ts-shared/dtos/guess/GuessItem';
import { IGuessItem } from '../model/GuessItem';
import { AbstractRepository, IAbstractRepository } from './AbstractRepository';
import { UpdateTimeListener } from './listeners/UpdateTimeListener';

export interface IGuessItemRepository extends IAbstractRepository<IGuessItem> {
  searchItems(category: Category, search: string): Promise<IGuessItem[]>;
}

export class GuessItemRepository extends AbstractRepository<IGuessItem> implements IGuessItemRepository {

  constructor(collection: Collection) {
    super(collection, [new UpdateTimeListener()]);
  }

  async searchItems(category: Category, search: string): Promise<IGuessItem[]> {
    return this.cursorToList(this.collection.find({
      category,
      alternateNames: { $text: search },
    }));
  }
}
