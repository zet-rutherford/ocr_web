import { MigrationInterface, QueryRunner } from "typeorm";

export class CrateUserTable1704337444383 implements MigrationInterface {
    name = 'CrateUserTable1704337444383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`status\` int NOT NULL DEFAULT '1', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
