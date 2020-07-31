import { Body, JsonController, Post } from 'routing-controllers';
import { UserService } from '../../services/user.service';
@JsonController('/sigin')
export class SiginController {
    constructor(
        private userService: UserService) {
    }

    @Post('/')
    public authUser(@Body() user: any): Promise<any> {
        return this.userService.authUser(user);
    }
}
