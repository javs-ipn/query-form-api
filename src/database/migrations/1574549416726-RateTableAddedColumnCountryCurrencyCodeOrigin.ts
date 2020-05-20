import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class RateTableAddedColumnCountryCurrencyCodeOrigin1574549416726 implements MigrationInterface {
    private rateTable = new Table({ name: 'rate' });

    public async up(queryRunner: QueryRunner): Promise<any> {
        const countryCurrencyCodeOriginColumn: TableColumn = new TableColumn({
            name: 'country_currency_code_origin',
            type: 'nvarchar',
            length: '50',
            isNullable: true,
        });
        await queryRunner.addColumn(this.rateTable, countryCurrencyCodeOriginColumn);
        await queryRunner.query(`UPDATE rate set country_currency_code_origin = 'MXN'`);
        const changecountryCurrencyCodeOrigin = countryCurrencyCodeOriginColumn.clone();
        changecountryCurrencyCodeOrigin.isNullable = false;
        await queryRunner.changeColumn(this.rateTable, countryCurrencyCodeOriginColumn, changecountryCurrencyCodeOrigin);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const countryCurrencyCodeOriginDrop: TableColumn = new TableColumn();
        countryCurrencyCodeOriginDrop.name = 'country_currency_code_origin';
        await queryRunner.dropColumn(this.rateTable, countryCurrencyCodeOriginDrop);
    }
}
