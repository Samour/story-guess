import { Collection } from 'mongodb';
import { ISession } from '../model/Session';
import { UpdateTimeListener } from './listeners/UpdateTimeListener';
import { IAbstractRepository, AbstractRepository } from './AbstractRepository';

export interface ISessionRepository extends IAbstractRepository<ISession> {
  findActiveSession(sessionId: string): Promise<ISession>;
}

export class SessionRepository extends AbstractRepository<ISession> implements ISessionRepository {

  constructor(collection: Collection) {
    super(collection, [new UpdateTimeListener()]);
  }

  async findActiveSession(_id: string): Promise<ISession> {
    return this.collection.findOne({ _id, sessionExpiry: { $gt: new Date() } });
  }
}
