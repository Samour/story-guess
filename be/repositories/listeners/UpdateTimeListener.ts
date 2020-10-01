import { IListener } from './IListener';

interface ITimedEntity {
  createdAt: Date;
  updatedAt: Date;
}

export class UpdateTimeListener implements IListener<ITimedEntity> {
  prePersist(record: ITimedEntity): void {
    const now: Date = new Date();
    record.updatedAt = now;
    if (!record.createdAt) {
      record.createdAt = now;
    }
  }
}
