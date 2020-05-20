import { EntityRepository, Repository } from 'typeorm';

import { DB } from '../models/db.model';

@EntityRepository(DB)
export class DBRepository extends Repository<DB> {
    public async getDB(): Promise<DB[]> {
        return this.find();
    }
}
