import { Authorized, Get, JsonController } from 'routing-controllers';

import { QueriesService } from '../../services/queries.service';

@Authorized()
@JsonController('/queries')
export class QueriesController {
    constructor(
        private queriesService: QueriesService) {
    }

    @Get('/')
    public getQueries(): Promise<any> {
        return this.queriesService.getAllQueries();
    }
}
