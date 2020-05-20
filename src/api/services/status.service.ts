import * as _ from 'lodash';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Service } from 'typedi';
import { GenericNotFoundError } from '../errors/Generic/generic-notFound.error';
import { StatusRepository } from '../repositories/status.repository';
import { Status } from '../models/status.model';
@Service()
export class StatusService {

    constructor(
        @OrmRepository() private statusRepository: StatusRepository) {
    }

    public async getStatus(): Promise<Status[]> {
        const status = await this.statusRepository.getStatus();
        if (!status) {
            throw new GenericNotFoundError('Error:', undefined);
        }
        return status;
    }
}
