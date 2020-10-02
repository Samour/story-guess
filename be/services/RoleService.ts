import { IRole } from '../model/Role';
import { IRoleRepository } from '../repositories/RoleRepository';

export interface IRoleService {
  loadRoles(roleIds: string[]): Promise<IRole[]>;
}

export class RoleService implements IRoleService {

  constructor(private readonly roleRepository: IRoleRepository) { }

  async loadRoles(roleIds: string[]): Promise<IRole[]> {
    return this.roleRepository.findByIds(roleIds);
  }
}
