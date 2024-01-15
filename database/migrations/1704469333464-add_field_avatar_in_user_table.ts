import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFieldAvatarInUserTable1704469333464 implements MigrationInterface {
    name = 'AddFieldAvatarInUserTable1704469333464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`avatar\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`avatar\``);
    }

}
