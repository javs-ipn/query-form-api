import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'user', type: 'varchar', comment: 'User name' })
    public user: string;

    @Column({ name: 'email', type: 'varchar', comment: 'User email' })
    public email: string;

    @Column({ name: 'pass', type: 'varchar', comment: 'User password' })
    public pass: string;

    @Column({ name: 'role_id', type: 'varchar', comment: 'User role' })
    public roleId: string;

    @Column({ name: 'status_id', type: 'varchar', comment: 'Status id' })
    public statusId: string;
}
