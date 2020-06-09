import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity('db')
export class DB {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'base', comment: 'Database name' })
    public base: string;

    @Column({ name: 'user_name', comment: 'User name' })
    public userName: string;

    @Column({ name: 'private_ip', type: 'varchar', comment: 'Private IP' })
    public privateIp: string;

    @Column({ name: 'password', type: 'varchar', length: 'max', nullable: false, comment: 'User password' })
    public password: string;
}
