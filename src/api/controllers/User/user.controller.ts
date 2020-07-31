import { GenericBussinessLogicError } from './../../errors/Generic/generic-bussinessLogic.error';
import { Get, JsonController, Post, Body, Authorized } from 'routing-controllers';
import * as bcrypt from 'bcrypt';

import { UserService } from '../../services/user.service';

@Authorized()
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
        bcrypt.hash(user.pass, 10, (err, encrypted) => {
            if (err) {
                throw new GenericBussinessLogicError('Error encrypting password');
            }
            user.pass = encrypted;
            this.userService.createUser(user);
        });
        return user;
    }

    @Post('/updateUser')
    public updateUser(@Body() user: any): Promise<any> {
        return this.userService.updateUser(user);
    }
}
