import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1708797361311 implements MigrationInterface {
  name = 'Init1708797361311';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "transactions" ("id" character varying NOT NULL, "block" integer NOT NULL, "from" character varying NOT NULL, "to" character varying NOT NULL, "value" numeric NOT NULL, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "transactions"`);
  }
}
