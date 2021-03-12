/* eslint-disable @typescript-eslint/no-explicit-any */
import { MigrationInterface, QueryRunner } from 'typeorm';
import { Specialties } from '../models/Specialties';

const objectToDb = [
  {
    name: 'ALERGOLOGIA',
  },
  {
    name: 'ANGIOLOGIA',
  },
  {
    name: 'BUCO MAXILO',
  },
  {
    name: 'CARDIOLOGIA CLÍNICA',
  },
  {
    name: 'CARDIOLOGIA INFANTIL',
  },
  {
    name: 'CIRURGIA CABEÇA E PESCOÇO',
  },
  {
    name: 'CIRURGIA CARDÍACA',
  },
  {
    name: 'CIRURGIA DE TÓRAX',
  },
];

export class SeedSpecialties1615511515835 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const specialties = queryRunner.manager.getRepository(Specialties);
    const arraycreate = objectToDb.map(obj => {
      return specialties.create(obj);
    });

    await specialties.save(arraycreate);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('x');
  }
}
