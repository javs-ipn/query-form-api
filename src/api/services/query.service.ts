import { GenericBussinessLogicError } from './../errors/Generic/generic-bussinessLogic.error';
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
    public queryError: boolean;
    constructor(
        @OrmRepository() private queryRepository: QueryRepository,
        @OrmRepository() private dbRepository: DBRepository
    ) { }

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

    public async updateQuery(queryInfo: any): Promise<any> {
        try {
            const query = await this.queryRepository.getQueryById(queryInfo.id);
            const db = await this.dbRepository.getDbById(query[0].bdId);
            if (!query) {
                throw new GenericNotFoundError('Queries not found', undefined);
            }
            if (queryInfo.newStatus === 1) {
                const queryRequest: QueryRequest = {
                    host: db[0].privateIp,
                    pass: db[0].password,
                    userName: db[0].userName,
                    query: query[0].query,
                };
                const successQuery = await this.handleQuery(queryRequest);
                console.log('successQuery', successQuery);
                if (successQuery) {
                    const queryUpdated = await this.queryRepository.updateQuery(queryInfo);
                    return queryUpdated;
                } else {
                    return false;
                }
            } else {
                const queryUpdated = await this.queryRepository.updateQuery(queryInfo);
                return queryUpdated;
            }
        } catch (err) {
            throw new GenericBussinessLogicError('hola');
        }
    }

    public async executeQuery(queryRequest: QueryRequest): Promise<any> {
        return new Promise((resolve, reject) => {
            const conn = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'permiso',
            });
            conn.query(queryRequest.query, (error, rows, fields) => {
                if (error) {
                    this.queryError = true;
                } else {
                    this.queryError = false;
                }
                resolve();
            });
            conn.end();
        });
    }

    public async handleQuery(queryRequest: QueryRequest): Promise<any> {
        await this.executeQuery(queryRequest);
        if (this.queryError) {
            return false;
        }
        return true;
    }
}
