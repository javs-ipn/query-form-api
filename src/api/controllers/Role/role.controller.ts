import { Authorized, Get, JsonController } from 'routing-controllers';

import { RoleService } from '../../services/role.service';

@Authorized()
@JsonController('/role')
export class RoleController {
    constructor(
        private roleService: RoleService) {
    }

    @Get('/')
    public getUsers(): Promise<any> {
        return this.roleService.getRoles();
    }
}
