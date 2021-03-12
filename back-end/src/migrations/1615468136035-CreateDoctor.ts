import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateDoctor1615468136035 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Doctors',
        columns: [
          {
            name: 'id',
            type: 'INTEGER',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar(120)',
          },
          {
            name: 'crm',
            type: 'decimal(7)',
          },
          {
            name: 'telephone',
            type: 'varchar',
          },
          {
            name: 'cellphone',
            type: 'varchar',
          },
          {
            name: 'cep',
            type: 'varchar(9)',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Doctors');
  }
}
