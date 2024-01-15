import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleUser1704550495605 implements MigrationInterface {
    name = 'AddRoleUser1704550495605'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` varchar(255) NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
    }

}
