import {MigrationInterface, QueryRunner} from "typeorm";

export class userDates1631897440486 implements MigrationInterface {
    name = 'userDates1631897440486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "createdAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "updatedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "createdAt"`);
    }

}
