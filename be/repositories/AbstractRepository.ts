import { Collection } from 'mongodb';
import { IListener } from './listeners/IListener';

export interface IAbstractRepository<T> {
  save: (value: T) => Promise<void>;
}

export abstract class AbstractRepository<T> implements IAbstractRepository<T> {

  constructor(private readonly collection: Collection, private readonly listeners: IListener<T>[] = []) {}

  protected prePersist(record: T): void {
    this.listeners.forEach((l) => l.prePersist(record));
  }

  async save(value: T): Promise<void> {
    this.prePersist(value);
    await this.collection.insertOne(value);
  }
}
