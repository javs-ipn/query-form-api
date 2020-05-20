import { Get, JsonController, Post, Body } from 'routing-controllers';

import { UserService } from '../../services/user.service';

@JsonController('/user')
export class UserController {
    constructor(
        private userService: UserService) {
    }

    @Get('/')
    public getUsers(): Promise<any> {
        return this.userService.getUsers();
    }

    @Post('/createUser')
    public createUser(@Body() user: any): Promise<any> {
        return this.userService.createUser(user);
    }

    @Post('/updateUser')
    public updateUser(@Body() user: any): Promise<any> {
        return this.userService.updateUser(user);
    }
}
