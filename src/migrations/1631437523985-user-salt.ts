import {MigrationInterface, QueryRunner} from "typeorm";

export class userSalt1631437523985 implements MigrationInterface {
    name = 'userSalt1631437523985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "salt" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "salt"`);
    }

}
