import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity('status')
export class Status {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'status', type: 'varchar', comment: 'Status name' })
    public status: string;
}
