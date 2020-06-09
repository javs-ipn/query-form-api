import { EntityRepository, Repository, getConnection } from 'typeorm';

import { User } from '../models/user.model';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    public async getUserByEmail(user: any): Promise<User> {
        return this.findOne({ email: user.email, pass: user.pass });
    }

    public async getUsers(): Promise<User[]> {
        return this.find();
    }

    public async createUser(user: any): Promise<User[]> {
        return this.save(user);
    }

    public async updateUser(user: any): Promise<any> {
        console.log('user', user);
        return await getConnection()
            .createQueryBuilder()
            .update(User)
            .set({ user: user.user, email: user.email, roleId: user.roleId, statusId: user.statusId })
            .where('id = :id', { id: user.id })
            .execute();
        // return this.update({ id: user.id }, { user: user.user, email: user.email, roleId: user.roleId, statusId: user.statusId});
    }
}
