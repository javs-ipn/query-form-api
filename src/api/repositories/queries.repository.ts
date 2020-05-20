import { EntityRepository, Repository } from 'typeorm';

import { Query } from '../models/query.model';

@EntityRepository(Query)
export class QueriesRepository extends Repository<Query> {
    public async getAllQueries(): Promise<any> {
        return await this.find();
    }
}
