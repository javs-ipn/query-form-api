import { Body, JsonController, Post, Get, Param, Authorized } from 'routing-controllers';
import { QueryService } from '../../services/query.service';

@Authorized()
@JsonController('/query-form')
export class QueryFormController {
    constructor(
        private queryService: QueryService) {
    }

    @Post('/')
    public saveQuery(@Body() query: any): Promise<any> {
        return this.queryService.saveQuery(query);
    }

    @Get('/:userId')
    public getQueriesByUserId(@Param('userId') userId: number): Promise<any[]> {
        return this.queryService.getQueriesByUserId(userId);
    }

    @Post('/updateQuery')
    public updateQuery(@Body() queryInfo: any): Promise<any> {
        return this.queryService.updateQuery(queryInfo);
    }
}
