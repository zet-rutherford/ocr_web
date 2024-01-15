import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnToUserTable1704339018752 implements MigrationInterface {
    name = 'AddColumnToUserTable1704339018752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
    }

}
