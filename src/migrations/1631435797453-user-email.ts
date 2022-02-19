import {MigrationInterface, QueryRunner} from "typeorm";

export class userEmail1631435797453 implements MigrationInterface {
    name = 'userEmail1631435797453'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "email" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "email" DROP NOT NULL`);
    }

}
