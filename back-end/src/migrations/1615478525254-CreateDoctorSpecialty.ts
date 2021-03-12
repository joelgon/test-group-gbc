import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateDoctorSpecialty1615478525254 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'DoctorSpecialty',
        columns: [
          {
            name: 'id',
            type: 'INTEGER',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'doctorId',
            type: 'INTEGER',
          },
          {
            name: 'specialtyId',
            type: 'INTEGER',
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
        foreignKeys: [
          {
            name: 'fk_Doctors',
            referencedTableName: 'Doctors',
            referencedColumnNames: ['id'],
            columnNames: ['doctorId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'fk_Specialties',
            referencedTableName: 'Specialties',
            referencedColumnNames: ['id'],
            columnNames: ['specialtyId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('DoctorSpecialty');
  }
}
