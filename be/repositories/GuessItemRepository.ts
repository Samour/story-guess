import { Collection, Cursor, FilterQuery } from 'mongodb';
import { Category } from '../../ts-shared/dtos/guess/GuessItem';
import { IGuessItem } from '../model/GuessItem';
import { AbstractRepository, IAbstractRepository } from './AbstractRepository';
import { UpdateTimeListener } from './listeners/UpdateTimeListener';

export interface IGuessItemRepository extends IAbstractRepository<IGuessItem> {
  countItems(category: Category | null, search: string | null): Promise<number>;
  searchItems(category: Category | null, search: string | null, offset: number, limit: number): Promise<IGuessItem[]>;
}

export class GuessItemRepository extends AbstractRepository<IGuessItem> implements IGuessItemRepository {

  constructor(collection: Collection) {
    super(collection, [new UpdateTimeListener()]);
  }

  private searchQuery(category: Category | null, search: string | null): Cursor<IGuessItem> {
    const query: FilterQuery<any> = {};
    if (category) {
      query.category = category;
    }
    if (search) {
      query.$text = { $search: search };
    }

    return this.collection.find(query);
  }

  async countItems(category: Category | null, search: string | null): Promise<number> {
    return this.searchQuery(category, search).count();
  }

  async searchItems(category: Category | null, search: string | null, offset: number, limit: number): Promise<IGuessItem[]> {
    return this.cursorToList(
      this.searchQuery(category, search)
        .skip(offset)
        .limit(limit)
    );
  }
}
