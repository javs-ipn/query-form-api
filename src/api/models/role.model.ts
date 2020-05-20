import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity('role')
export class Role {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'role', type: 'varchar', comment: 'User role' })
    public role: string;
}
