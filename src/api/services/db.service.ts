import * as _ from 'lodash';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Service } from 'typedi';
import { GenericNotFoundError } from '../errors/Generic/generic-notFound.error';
import { DB } from '../models/db.model';
import { DBRepository } from '../repositories/db.repository';
@Service()
export class DBService {

    constructor(
        @OrmRepository() private dbRepository: DBRepository) {
    }

    public async getDB(): Promise<DB[]> {
        const queryToBeSaved = await this.dbRepository.getDB();
        if (!queryToBeSaved) {
            throw new GenericNotFoundError('Error:', undefined);
        }
        return queryToBeSaved;
    }
}
