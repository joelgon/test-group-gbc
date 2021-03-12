import { Connection, Repository } from 'typeorm';
import { Doctorspecialty } from '../models/Doctorspecialty';

export interface IDoctorspecialty {
  doctorId: number;
  specialtyId: number;
}

export class DoctorspecialtyRepository {
  private Doctorspecialty: Repository<Doctorspecialty>;

  constructor(connection: Connection) {
    this.Doctorspecialty = connection.getRepository(Doctorspecialty);
  }

  findAll = async (): Promise<Doctorspecialty[]> => {
    try {
      return await this.Doctorspecialty.find();
    } catch (error) {
      throw new Error(error);
    }
  };

  findAllByDoctorId = async (id: number): Promise<Doctorspecialty[]> => {
    try {
      return await this.Doctorspecialty.find({
        where: {
          doctorId: id,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  findAllBySpecialtyId = async (id: number): Promise<Doctorspecialty[]> => {
    try {
      return await this.Doctorspecialty.find({
        where: {
          specialtyId: id,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  create = async (params: IDoctorspecialty): Promise<Doctorspecialty> => {
    try {
      const specialty = this.Doctorspecialty.create(params);
      return await this.Doctorspecialty.save(specialty);
    } catch (error) {
      throw new Error(error);
    }
  };
}
