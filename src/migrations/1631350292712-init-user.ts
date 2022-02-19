import {MigrationInterface, QueryRunner} from "typeorm";

export class initUser1631350292712 implements MigrationInterface {
    name = 'initUser1631350292712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "surName" character varying NOT NULL, "lastName" character varying, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
