import * as _ from 'lodash';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Service } from 'typedi';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../models/user.model';
import { GenericNotFoundError } from '../errors/Generic/generic-notFound.error';
import { env } from '../../env';
import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { GenericBussinessLogicError } from '../errors/Generic/generic-bussinessLogic.error';
import * as bcrypt from 'bcrypt';

@Service()
export class UserService {

    constructor(
        @OrmRepository() private userRepository: UserRepository) {
    }

    public async authUser(user: any): Promise<any> {
        const foundUser = await this.userRepository.getUserByEmail(user);
        if (!foundUser) {
            throw new GenericNotFoundError(user.email, undefined);
        }
        const crypted = bcrypt.compareSync(user.pass, foundUser.pass);
        if (crypted) {
            const token = await this.getTokenInfo(user);
            return { foundUser, token };
        } else {
            throw new GenericNotFoundError(user.email, undefined);
        }
    }

    public async getTokenInfo(user: any): Promise<any> {
        const axiosRequestConfig: any = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        };
        const axiosResponse: AxiosPromise<any> = axios.post(env.auth.route, user, axiosRequestConfig);
        return await axiosResponse
            .then((dhlRateResponse: AxiosResponse<any>) => {
                const tokenResponse: any = dhlRateResponse.data;
                return Promise.resolve(tokenResponse);
            }).catch((error) => {
                if (!_.has(error, 'request')) {
                    throw new GenericBussinessLogicError(error.message);
                } else {
                    throw new GenericBussinessLogicError(error.response.data);
                }
            });
    }

    public async getUsers(): Promise<User[]> {
        const users = await this.userRepository.getUsers();
        if (!users) {
            throw new GenericNotFoundError('Users not found', undefined);
        }
        return users;
    }

    public async createUser(user: any): Promise<any> {
        const createdUser = await this.userRepository.createUser(user);
        if (!createdUser) {
            throw new GenericNotFoundError('User not created', undefined);
        }
        return createdUser;
    }

    public async updateUser(user: any): Promise<any> {
        const updateUser = await this.userRepository.updateUser(user);
        if (!updateUser) {
            throw new GenericNotFoundError('User not created', undefined);
        }
        return updateUser;
    }
}
