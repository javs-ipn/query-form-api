import {
    MigrationInterface,
    QueryRunner,
    TableColumn
} from 'typeorm';

export class RateTableRenamePackageDimensionsColumnToPackagesInfo1574559416726 implements MigrationInterface {
    private packagesInfoColumn: TableColumn = new TableColumn();
    private packagesDimensionsColumn: TableColumn = new TableColumn();

    constructor() {
        this.packagesInfoColumn.name = 'packages_info';
        this.packagesDimensionsColumn.name = 'dimensions_packages';
    }
    public async up(queryRunner: QueryRunner): Promise<any> {
        const tableRate = await queryRunner.getTable('rate');
        await queryRunner.renameColumn(tableRate, 'dimensions_packages', 'packages_info');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const tableRate = await queryRunner.getTable('rate');
        await queryRunner.renameColumn(tableRate, this.packagesInfoColumn.name, this.packagesDimensionsColumn.name);
    }
}
