import * as express from 'express';
import * as request from 'request';
import { Require, Service } from 'typedi';

import { Logger, LoggerInterface } from '../decorators/Logger';
import { env } from '../env';
import { TokenInfoInterface } from './TokenInfoInterface';
import { CryptoService } from '../api/services/crypto.service';
import { GenericNotFoundError } from '../api/errors/Generic/generic-notFound.error';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { UserRepository } from '../api/repositories/user.repository';
import { AuthRepository } from '../api/repositories/auth.repository';
import { Auth } from 'src/api/models/auth.model';

@Service()
export class AuthService {

    private static TOKEN_TYPE = 'bearer';
    private httpRequest: typeof request;

    constructor(
        @Require('request') r: any,
        @Logger(__filename) private log: LoggerInterface,
        private cryptoService: CryptoService,
        @OrmRepository() private userRepository: UserRepository,
        @OrmRepository() private authRepository: AuthRepository
    ) {
        this.httpRequest = r;
    }

    public async parseTokenFromRequest(req: express.Request): Promise<Auth | undefined> {
        const authorization = req.header('authorization');
        console.log('auth', authorization);

        // Retrieve the token form the Authorization header
        if (authorization && authorization.split(' ')[0] === 'Bearer') {
            this.log.info('Token provided by the client');
            const reqToken = authorization.split(' ')[1];
            const token = await this.authRepository.getToken(reqToken);
            return token;
        }

        this.log.info('No Token provided by the client');
        return undefined;
    }

    public getTokenInfo(token: string): Promise<TokenInfoInterface> {
        return new Promise((resolve, reject) => {
            this.httpRequest({
                method: 'POST',
                url: env.auth.route,
                form: {
                    id_token: token,
                },
            }, (error: any, response: request.RequestResponse, body: any) => {
                // Verify if the requests was successful and append user
                // information to our extended express request object
                if (!error) {
                    if (response.statusCode === 200) {
                        const tokeninfo = JSON.parse(body);
                        return resolve(tokeninfo);
                    }
                    return reject(body);
                }
                return reject(error);
            });
        });
    }

    public async createToken(user: any): Promise<any> {
        const foundUser = await this.userRepository.getUserByEmail(user);
        if (!foundUser) {
            throw new GenericNotFoundError(user.email, undefined);
        }
        const createdToken = this.cryptoService.createToken();
        let objectToken;
        this.authRepository.save({
            email: user.email,
            token: createdToken,
        });
        objectToken = {
            access_token: createdToken,
            token_type: AuthService.TOKEN_TYPE,
        };
        return objectToken;
    }

}
