/* eslint-disable @typescript-eslint/no-explicit-any */
import { MigrationInterface, QueryRunner } from 'typeorm';
import { Doctorspecialty } from '../models/Doctorspecialty';

const objectToDb = [
  {
    doctorId: 1,
    specialtyId: 1,
  },
  {
    doctorId: 1,
    specialtyId: 2,
  },
  {
    doctorId: 2,
    specialtyId: 3,
  },
  {
    doctorId: 2,
    specialtyId: 4,
  },
  {
    doctorId: 3,
    specialtyId: 5,
  },
  {
    doctorId: 3,
    specialtyId: 6,
  },
  {
    doctorId: 4,
    specialtyId: 7,
  },
  {
    doctorId: 4,
    specialtyId: 8,
  },
];

export class SeedDoctorSpecialty1615512763835 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const doctorspecialty = queryRunner.manager.getRepository(Doctorspecialty);
    const arrayCreate = objectToDb.map(obj => {
      return doctorspecialty.create(obj);
    });

    await doctorspecialty.save(arrayCreate);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('x');
  }
}
