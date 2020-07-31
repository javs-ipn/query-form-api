import { Authorized, Get, JsonController } from 'routing-controllers';

import { DBService } from './../../services/db.service';

@Authorized()
@JsonController('/db')
export class QueryFormController {
    constructor(
        private dbService: DBService) {
    }

    @Get('/')
    public getDB(): Promise<any> {
        return this.dbService.getDB();
    }
}
