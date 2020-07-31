import { Authorized, Get, JsonController } from 'routing-controllers';

import { StatusService } from '../../services/status.service';

@Authorized()
@JsonController('/status')
export class StatusController {
    constructor(
        private statusService: StatusService) {
    }

    @Get('/')
    public getStatus(): Promise<any> {
        return this.statusService.getStatus();
    }
}
