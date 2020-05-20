import { MigrationInterface, QueryRunner, TableColumn, Table } from 'typeorm';

export class RateTableAddedColumnEnvioClickRateId1574874323231 implements MigrationInterface {
    private rateTable = new Table({ name: 'rate' });

    public async up(queryRunner: QueryRunner): Promise<any> {
        const envioClickRateId: TableColumn = new TableColumn({
            name: 'envioclick_rate_id',
            type: 'int',
            isNullable: true,
            comment: 'EnvioClick rate id',
        });

        await queryRunner.addColumn(this.rateTable, envioClickRateId);
        await queryRunner.query(`UPDATE rate set envioclick_rate_id = 0`);
        const changeEnvioClickRateId = envioClickRateId.clone();
        changeEnvioClickRateId.isNullable = false;
        await queryRunner.changeColumn(this.rateTable, envioClickRateId, changeEnvioClickRateId);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const envioClickRateIdDrop: TableColumn = new TableColumn();
        envioClickRateIdDrop.name = 'envioclick_rate_id';
        await queryRunner.dropColumn(this.rateTable, envioClickRateIdDrop);
    }
}
