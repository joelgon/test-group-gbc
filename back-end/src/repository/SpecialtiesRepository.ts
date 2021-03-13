import { Connection, Repository } from 'typeorm';
import { Doctorspecialty } from '../models/Doctorspecialty';
import { Specialties } from '../models/Specialties';

export interface ISpecialty {
  name: string;
}

export class SpecialtiesRepository {
  private Specialties: Repository<Specialties>;
  private Doctorspecialty: Repository<Doctorspecialty>;

  constructor(connection: Connection) {
    this.Specialties = connection.getRepository(Specialties);
    this.Doctorspecialty = connection.getRepository(Doctorspecialty);
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

  update = async (id: string, params: ISpecialty): Promise<void> => {
    try {
      await this.Specialties.update(id, params);
    } catch (error) {
      throw new Error(error);
    }
  };

  delete = async (id: string): Promise<void> => {
    try {
      const [, flag] = await Promise.all([
        this.Specialties.softDelete(id),

        this.Doctorspecialty.find({
          where: {
            specialtyId: id,
          },
        }),
      ]);

      await Promise.all(
        flag.map(async f => {
          this.Doctorspecialty.softDelete(f.id);
        }),
      );
    } catch (error) {
      throw new Error(error);
    }
  };
}
