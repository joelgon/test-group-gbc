/* eslint-disable @typescript-eslint/no-explicit-any */
import { MigrationInterface, QueryRunner } from 'typeorm';
import { Doctors } from '../models/Doctors';

const objectToDb = [
  {
    name: 'Paulo José',
    crm: 1234567,
    telephone: '+55 11 95047-4173',
    cellphone: '+55 11 95047-4173',
    cep: '07403-040',
  },
  {
    name: 'Maria da Penha',
    crm: 7654321,
    telephone: '+55 11 4173-95047',
    cellphone: '+55 11 4173-95047',
    cep: '07403-040',
  },
  {
    name: 'Neusa Aparecida Fernandes do Prado',
    crm: 3214567,
    telephone: '+55 11 4173-95049',
    cellphone: '+55 11 4173-95049',
    cep: '07403-040',
  },
  {
    name: 'Sandro Moraes',
    crm: 3217654,
    telephone: '+55 11 4173-95059',
    cellphone: '+55 11 4173-95059',
    cep: '07403-040',
  },
];

export class SeedDoctor1615507041013 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const doctors = queryRunner.manager.getRepository(Doctors);
    const arrayCreate = objectToDb.map(obj => {
      return doctors.create(obj);
    });

    await doctors.save(arrayCreate);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('x');
  }
}
