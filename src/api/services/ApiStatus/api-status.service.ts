import { ApiStatusConstants } from '../../../constants/ApiStatusConstants/api-status.constant';
import { ApiStatusInterface } from '../../types/ApiStatus/api-status.interface';
import { createConnection, getConnectionManager } from 'typeorm';
import { env } from '../../../env';
import { Service } from 'typedi';

@Service()
export class ApiStatusService {

    /**
     * @description Gets the api status such as db status, api status and api name
     */
    public async getApiStatus(): Promise<ApiStatusInterface> {
        const dbConnectionValue = await this.getDbStatus();
        const apiStatus: ApiStatusInterface = {
            dbStatus: dbConnectionValue,
            apiStatus: ApiStatusConstants.OK,
            apiName: env.app.name,
        };
        return Promise.resolve(apiStatus);
    }

    /**
     * @description - creates a connection to test the database connection status after checked
     * closes it
     */
    public async getDbStatus(): Promise<string> {
        try {
            const connection = await createConnection({
                name: ApiStatusConstants.GENERIC_CONNECTION_NAME + getConnectionManager().connections.length,
                type: env.db.type as any,
                host: env.db.host,
                port: env.db.port,
                connectionTimeout: ApiStatusConstants.TIMEOUT,
                username: env.db.username,
                password: env.db.password,
                database: env.db.database,
                options: {
                    connectTimeout: ApiStatusConstants.TIMEOUT,
                    cancelTimeout: ApiStatusConstants.TIMEOUT,
                    encrypt: env.db.encrypt,
                },
            });

            if (connection) {
                connection.close();
                return Promise.resolve(ApiStatusConstants.OK);
            }
            return Promise.resolve(ApiStatusConstants.DOWN);
        } catch (error) {
            return Promise.resolve(ApiStatusConstants.DOWN);
        }
    }
}
