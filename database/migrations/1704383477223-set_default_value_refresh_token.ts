import { MigrationInterface, QueryRunner } from "typeorm";

export class SetDefaultValueRefreshToken1704383477223 implements MigrationInterface {
    name = 'SetDefaultValueRefreshToken1704383477223'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NOT NULL`);
    }

}
