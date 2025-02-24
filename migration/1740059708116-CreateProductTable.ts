import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductTable1740059526825 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "product" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "description" TEXT NOT NULL,
        "price" DECIMAL(10, 2) NOT NULL,
        "amount" INT NOT NULL DEFAULT 0,
        "category" VARCHAR(255) NULL,
        "image" TEXT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "product";`);
  }
}
