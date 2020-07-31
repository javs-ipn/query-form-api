import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity('auth')
export class Auth {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'user_email', comment: 'User email' })
    public email: string;

    @Column({ name: 'token', comment: 'Token' })
    public token: string;
}
