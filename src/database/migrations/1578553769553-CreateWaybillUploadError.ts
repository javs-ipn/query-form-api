import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateWaybillUploadError1578553769553 implements MigrationInterface {

    private readonly TABLE_NAME = 'waybill_upload_error';

    public async up(queryRunner: QueryRunner): Promise<any> {
        const waybillUploadErrorTable = new Table ({
            name: this.TABLE_NAME,
            columns: [
                {
                    name: 'id',
                    type: 'int identity(1,1)',
                    isGenerated: true,
                    isPrimary: true,
                    comment: 'Waybill uplad error id',
                },
                {
                    name: 'waybill_doc',
                    type: 'nvarchar',
                    length: 'max',
                    isNullable: false,
                    comment: 'Waybill pdf base_64 or pdf storage URL',
                },
                {
                    name: 'waybill_id',
                    type: 'int',
                    isNullable: false,
                    comment: 'Related courier Id',
                },
                {
                    name: 'waybill_number',
                    type: 'nvarchar',
                    length: '255',
                    isNullable: false,
                    comment: 'Waybill number that had the error',
                },
                {
                    name: 'message_error',
                    type: 'nvarchar',
                    length: 'max',
                    isNullable: false,
                    comment: 'Azure storage error response',
                },
                {
                    name: 'created',
                    type: 'DATETIME',
                    default: 'GETDATE()',
                    isNullable: false,
                    comment: 'Created date for the row',
                },
                {
                    name: 'status',
                    type: 'smallint',
                    isNullable: false,
                    default: 0,
                    comment: 'Indicates if a waybill upload error was recovered',
                },
                {
                    name: 'is_main_waybill',
                    type: 'smallint',
                    isNullable: false,
                    default: 1,
                    comment: 'Indicates if is the main waybill',
                },
            ],
        });
        await queryRunner.createTable(waybillUploadErrorTable);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const waybillUploadErrorTableDrop = new Table();
        waybillUploadErrorTableDrop.name = this.TABLE_NAME;
        await queryRunner.dropTable(waybillUploadErrorTableDrop);
    }

}
