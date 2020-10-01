import { Collection } from 'mongodb';
import { IUser } from '../model/User';
import { IAbstractRepository, AbstractRepository } from './AbstractRepository';
import { UpdateTimeListener } from './listeners/UpdateTimeListener';

export interface IUserRepository extends IAbstractRepository<IUser> {
}

export class UserRepository extends AbstractRepository<IUser> implements IUserRepository {

  constructor(collection: Collection) {
    super(collection, [new UpdateTimeListener()]);
  }
}
