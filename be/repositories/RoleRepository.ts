import { Collection } from 'mongodb';
import { IRole } from '../model/Role';
import { AbstractRepository, IAbstractRepository } from './AbstractRepository';
import { UpdateTimeListener } from './listeners/UpdateTimeListener';

export interface IRoleRepository extends IAbstractRepository<IRole> {
}

export class RoleRepository extends AbstractRepository<IRole> implements IRoleRepository {

  constructor(collection: Collection) {
    super(collection, [new UpdateTimeListener()]);
  }
}
