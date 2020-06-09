import { EntityRepository, Repository } from 'typeorm';

import { Query } from '../models/query.model';

@EntityRepository(Query)
export class QueryRepository extends Repository<Query> {
    public async saveQuery(query: any): Promise<Query> {
        return await this.save(query);
    }

    public async getQueriesByUserId(userId: number): Promise<Query[]> {
        return await this.find({
            where: { userId },
        });
    }

    public async updateQuery(queryInfo: any): Promise<any> {
        return this.update({ id: queryInfo.id }, { statusId: queryInfo.newStatus, rejectMssg: queryInfo.rejectMssg });
    }

    public async getQueryById(queryId: number): Promise<Query[]> {
        return await this.find({
            where: { id: queryId },
        });
    }
}
