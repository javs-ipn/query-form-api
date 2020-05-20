import { Get, JsonController } from 'routing-controllers';

import { StatusService } from '../../services/status.service';

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
