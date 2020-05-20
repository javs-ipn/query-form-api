import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    Table
} from 'typeorm';

export class RateTableAddServiceNameAndEstimatedDeliveryDate1574559416716 implements MigrationInterface {
    private rateTable = new Table({ name: 'rate' });

    public async up(queryRunner: QueryRunner): Promise<any> {
        const serviceNameColumn: TableColumn = new TableColumn({
            name: 'service_name',
            type: 'nvarchar',
            length: '255',
            isNullable: false,
        });
        const estimatedDeliveryDateColumn: TableColumn = new TableColumn({
            name: 'courier_estimated_delivery_date',
            type: 'nvarchar',
            length: '255',
            isNullable: false,
        });
        await queryRunner.addColumns(this.rateTable.name, [serviceNameColumn, estimatedDeliveryDateColumn]);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const serviceNameColumnDrop: TableColumn = new TableColumn();
        serviceNameColumnDrop.name = 'country_currency_code_origin';
        const estimatedDeliveryDateColumnDrop: TableColumn = new TableColumn();
        estimatedDeliveryDateColumnDrop.name = 'country_currency_code_origin';
        await queryRunner.dropColumns(this.rateTable.name, [serviceNameColumnDrop, estimatedDeliveryDateColumnDrop]);
    }
}
