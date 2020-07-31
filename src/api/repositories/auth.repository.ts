import { EntityRepository, Repository } from 'typeorm';

import { Auth } from '../models/auth.model';

@EntityRepository(Auth)
export class AuthRepository extends Repository<Auth> {
    public async getTokenByEmail(user: any): Promise<Auth> {
        return this.findOne({ email: user.email });
    }

    public async getToken(token: any): Promise<Auth> {
        return this.findOne({ token });
    }
}
