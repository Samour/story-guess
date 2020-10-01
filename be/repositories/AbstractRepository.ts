import { Collection } from 'mongodb';
import { IListener } from './listeners/IListener';

export interface IAbstractRepository<T> {
  save: (value: T) => Promise<void>;
  findById: (id: string) => Promise<T | null>;
}

export abstract class AbstractRepository<T> implements IAbstractRepository<T> {

  constructor(protected readonly collection: Collection, private readonly listeners: IListener<T>[] = []) { }

  protected prePersist(record: T): void {
    this.listeners.forEach((l) => l.prePersist(record));
  }

  async save(value: T): Promise<void> {
    this.prePersist(value);
    await this.collection.insertOne(value);
  }

  async findById(_id: string): Promise<T | null> {
    return this.collection.findOne({ _id });
  }
}
