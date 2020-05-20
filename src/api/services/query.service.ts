import * as _ from 'lodash';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Service } from 'typedi';
import { GenericNotFoundError } from '../errors/Generic/generic-notFound.error';
import { QueryRepository } from '../repositories/query.repository';
import { Query } from '../models/query.model';
@Service()
export class QueryService {

    constructor(
        @OrmRepository() private queryRepository: QueryRepository) {
    }

    public async saveQuery(query: any): Promise<Query> {
        const queryToBeSaved = await this.queryRepository.saveQuery(query);
        if (!queryToBeSaved) {
            throw new GenericNotFoundError(queryToBeSaved.query, undefined);
        }
        return queryToBeSaved;
    }

    public async getQueriesByUserId(userId: number): Promise<Query[]> {
        const queriesFromUser = await this.queryRepository.getQueriesByUserId(userId);
        if (!queriesFromUser) {
            throw new GenericNotFoundError('Queries not found', undefined);
        }
        return queriesFromUser;
    }

    public async updateQuery(queryInfo: any): Promise<Query> {
        const queryUpdated = await this.queryRepository.updateQuery(queryInfo);
        if (!queryUpdated) {
            throw new GenericNotFoundError('Queries not found', undefined);
        }
        return queryUpdated;
    }
}
