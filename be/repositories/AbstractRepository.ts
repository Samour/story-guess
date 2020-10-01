import { Collection } from 'mongodb';
import { IListener } from './listeners/IListener';

interface Entity {
  _id: string;
}

export interface IAbstractRepository<T extends Entity> {
  save: (value: T) => Promise<void>;
  findById: (id: string) => Promise<T | null>;
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
}
