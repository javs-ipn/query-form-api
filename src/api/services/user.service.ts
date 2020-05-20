import * as _ from 'lodash';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Service } from 'typedi';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../models/user.model';
import { GenericNotFoundError } from '../errors/Generic/generic-notFound.error';
@Service()
export class UserService {

    constructor(
        @OrmRepository() private userRepository: UserRepository) {
    }

    public async authUser(user: any): Promise<User> {
        const foundUser = await this.userRepository.getUserByEmail(user);
        if (!foundUser) {
            throw new GenericNotFoundError(user.email, undefined);
        }
        return foundUser;
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
