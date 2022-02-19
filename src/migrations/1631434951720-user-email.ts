import {MigrationInterface, QueryRunner} from "typeorm";

export class userEmail1631434951720 implements MigrationInterface {
    name = 'userEmail1631434951720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "email" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "email"`);
    }

}
