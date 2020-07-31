import { JsonController, Post, Body } from 'routing-controllers';

import { AuthService } from '../../../auth/AuthService';

@JsonController('/oauth')
export class OAuthController {

    constructor(
        private oauthService: AuthService) {
    }

    @Post('/token')
    public createToken(@Body() user: any): Promise<any> {
        return this.oauthService.createToken(user);
    }
}
