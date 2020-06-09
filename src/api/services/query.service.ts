import { DBRepository } from './../repositories/db.repository';
import * as _ from 'lodash';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Service } from 'typedi';
import { GenericNotFoundError } from '../errors/Generic/generic-notFound.error';
import { QueryRepository } from '../repositories/query.repository';
import { Query } from '../models/query.model';
import { QueryRequest } from '../types/ApiStatus/query-request.interface';
import * as mysql from 'mysql';
@Service()
export class QueryService {

    constructor(
        @OrmRepository() private queryRepository: QueryRepository,
        @OrmRepository() private dbRepository: DBRepository) {
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
        const query = await this.queryRepository.getQueryById(queryInfo.id);
        const db = await this.dbRepository.getDbById(query[0].bdId);
        if (queryInfo.newStatus === 1) {
            const queryRequest: QueryRequest = {
                dbName: db[0].base,
                host: db[0].privateIp,
                pass: db[0].password,
                userName: db[0].userName,
                query: query[0].query,
            };
            this.executeQuery(queryRequest);
        }
        if (!queryUpdated) {
            throw new GenericNotFoundError('Queries not found', undefined);
        }
        return queryUpdated;
    }

    public executeQuery(queryRequest: QueryRequest): any {
        console.log('queryRequest', queryRequest);
        const conn = mysql.createConnection({
            host: queryRequest.host,
            user: queryRequest.userName,
            password: queryRequest.pass,
            database: queryRequest.dbName,
        });
        conn.connect();
        conn.query(queryRequest.query, (err, rows, fields) => {
            console.log('The solution is: ', rows);
        });
        conn.end();
    }
}
