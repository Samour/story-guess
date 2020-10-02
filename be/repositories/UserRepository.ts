import { Collection } from 'mongodb';
import { IUser } from '../model/User';
import { IAbstractRepository, AbstractRepository } from './AbstractRepository';
import { UpdateTimeListener } from './listeners/UpdateTimeListener';

export interface IUserRepository extends IAbstractRepository<IUser> {
  findByLoginId: (loginId: string) => Promise<IUser>;
}

export class UserRepository extends AbstractRepository<IUser> implements IUserRepository {

  constructor(collection: Collection) {
    super(collection, [new UpdateTimeListener()]);
  }

  async findByLoginId(loginId: string): Promise<IUser> {
    return this.collection.findOne({ loginId });
  }
}
