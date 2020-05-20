import {
    MigrationInterface,
    QueryRunner,
    TableColumn
} from 'typeorm';

export class AlterTableWaybillColumnWaybillNumbersToChildWaybills1574559416727 implements MigrationInterface {
    private waybillNumbers: TableColumn = new TableColumn();
    private childWaybills: TableColumn = new TableColumn();

    constructor() {
        this.waybillNumbers.name = 'waybill_numbers';
        this.childWaybills.name = 'child_waybills';
    }
    public async up(queryRunner: QueryRunner): Promise<any> {
        const tableRate = await queryRunner.getTable('waybill');
        await queryRunner.renameColumn(tableRate, 'waybill_numbers', 'child_waybills');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const tableRate = await queryRunner.getTable('rate');
        await queryRunner.renameColumn(tableRate, this.waybillNumbers.name, this.childWaybills.name);
    }
}
