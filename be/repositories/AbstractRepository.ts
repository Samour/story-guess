import { Collection, Cursor } from 'mongodb';
import { IListener } from './listeners/IListener';

interface Entity {
  _id: string;
}

export interface IAbstractRepository<T extends Entity> {
  save: (value: T) => Promise<void>;
  findById: (id: string) => Promise<T | null>;
  deleteById: (id: string) => Promise<void>;
}

export abstract class AbstractRepository<T extends Entity> implements IAbstractRepository<T> {

  constructor(protected readonly collection: Collection, private readonly listeners: IListener<T>[] = []) { }

  protected prePersist(record: T): void {
    this.listeners.forEach((l) => l.prePersist(record));
  }

  async save(value: T): Promise<void> {
    this.prePersist(value);
    await this.collection.updateOne({ _id: value._id }, { $set: value }, { upsert: true });
  }

  async findById(_id: string): Promise<T | null> {
    return this.collection.findOne({ _id });
  }

  async deleteById(_id: string): Promise<void> {
    await this.collection.deleteOne({ _id });
  }

  protected async cursorToList<D>(cursor: Cursor<D>): Promise<D[]> {
    const list: D[] = [];
    await cursor.forEach((d) => list.push(d));
    return list;
  }
}
