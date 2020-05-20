import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity('query')
export class Query {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'query', type: 'varchar', comment: 'Query description' })
    public query: string;

    @Column({ name: 'comments', type: 'varchar', comment: 'Comments' })
    public comments: string;

    @Column({ name: 'bd_id', type: 'int', nullable: false, comment: 'BD id' })
    public bdId: number;

    @Column({ name: 'user_id', type: 'int', nullable: false, comment: 'User id' })
    public userId: number;

    @Column({ name: 'status_id', type: 'int', nullable: false, comment: 'Status id' })
    public statusId: number;

    @Column({ name: 'reject_mssg', type: 'varchar', length: 'max', nullable: false, comment: 'User password' })
    public rejectMssg: string;
}
