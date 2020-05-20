import { Role } from './../models/role.model';
import * as _ from 'lodash';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Service } from 'typedi';
import { GenericNotFoundError } from '../errors/Generic/generic-notFound.error';
import { RoleRepository } from '../repositories/role.repository';
@Service()
export class RoleService {

    constructor(
        @OrmRepository() private roleRepository: RoleRepository) {
    }

    public async getRoles(): Promise<Role[]> {
        const roles = await this.roleRepository.getRoles();
        if (!roles) {
            throw new GenericNotFoundError('Roles not found', undefined);
        }
        return roles;
    }
}
