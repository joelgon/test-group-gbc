import { Connection, Repository } from 'typeorm';
import { Specialties } from '../models/Specialties';

export interface ISpecialty {
  name: string;
}

export class SpecialtiesRepository {
  private Specialties: Repository<Specialties>;

  constructor(connection: Connection) {
    this.Specialties = connection.getRepository(Specialties);
  }

  findAll = async (): Promise<Specialties[]> => {
    try {
      return await this.Specialties.find();
    } catch (error) {
      throw new Error(error);
    }
  };

  findOne = async (id: number): Promise<Specialties> => {
    try {
      const specialty = await this.Specialties.findOne(id);
      if (!specialty) {
        return {} as Specialties;
      }
      return specialty;
    } catch (error) {
      throw new Error(error);
    }
  };

  create = async (params: ISpecialty): Promise<Specialties> => {
    try {
      const specialty = this.Specialties.create(params);
      return this.Specialties.save(specialty);
    } catch (error) {
      throw new Error(error);
    }
  };
}
