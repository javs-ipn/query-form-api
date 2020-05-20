import * as _ from 'lodash';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Service } from 'typedi';
import { GenericNotFoundError } from '../errors/Generic/generic-notFound.error';
import { QueriesRepository } from '../repositories/queries.repository';
@Service()
export class QueriesService {

    constructor(
        @OrmRepository() private queryRepository: QueriesRepository) {
    }

    public async getAllQueries(): Promise<any> {
        const allQueries = await this.queryRepository.getAllQueries();
        if (!allQueries) {
            throw new GenericNotFoundError('Queries not found', undefined);
        }
        return allQueries;
    }
}
