import { Connection, Repository } from 'typeorm';
import { Doctors } from '../models/Doctors';
import { Specialties } from '../models/Specialties';

export interface IDoctorReq {
  name: string;
  crm: number;
  telephone: string;
  cellphone: string;
  cep: string;
}

interface IDoctorRes extends IDoctorReq {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

interface IDoctor {
  Doctor: IDoctorRes;
  specialty: Specialties[];
}

export class DoctorRepository {
  private Doctors: Repository<Doctors>;

  constructor(connection: Connection) {
    this.Doctors = connection.getRepository(Doctors);
  }

  findAll = async (): Promise<IDoctor[]> => {
    try {
      const doctors = await this.Doctors.find({
        join: {
          alias: 'd',
          leftJoinAndSelect: {
            doctorspecialties: 'd.doctorspecialties',
            specialty: 'doctorspecialties.specialty',
          },
        },
      });

      const response: IDoctor[] = doctors.map(doctor => {
        return {
          Doctor: {
            id: doctor.id,
            name: doctor.name,
            crm: doctor.crm,
            telephone: doctor.telephone,
            cellphone: doctor.cellphone,
            cep: doctor.cep,
            createdAt: doctor.createdAt,
            updatedAt: doctor.updatedAt,
            deletedAt: doctor.deletedAt,
          },
          specialty: doctor.doctorspecialties.map(
            doctorSpacialty => doctorSpacialty.specialty,
          ),
        };
      });

      return response;
    } catch (error) {
      throw new Error(error);
    }
  };

  findOne = async (id: number): Promise<IDoctor> => {
    try {
      const doctor = await this.Doctors.findOne(id, {
        join: {
          alias: 'd',
          leftJoinAndSelect: {
            doctorspecialties: 'd.doctorspecialties',
            specialty: 'doctorspecialties.specialty',
          },
        },
      });
      if (!doctor) {
        return {} as IDoctor;
      }
      const response: IDoctor = {
        Doctor: {
          id: doctor.id,
          name: doctor.name,
          crm: doctor.crm,
          telephone: doctor.telephone,
          cellphone: doctor.cellphone,
          cep: doctor.cep,
          createdAt: doctor.createdAt,
          updatedAt: doctor.updatedAt,
          deletedAt: doctor.deletedAt,
        },
        specialty: doctor.doctorspecialties.map(
          doctorSpacialty => doctorSpacialty.specialty,
        ),
      };
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };

  createDoctor = async (params: IDoctorReq): Promise<Doctors> => {
    try {
      const doctorCreate = this.Doctors.create(params);
      return await this.Doctors.save(doctorCreate);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  update = async (id: number, params: IDoctorReq): Promise<Doctors> => {
    try {
      const doctor = await this.Doctors.findOne(id);
      if (doctor === undefined) {
        throw new Error('doctor does not exist in the Doctors table');
      }
      Object.assign(doctor, { ...params });
      return await this.Doctors.save(doctor);
    } catch (error) {
      throw new Error(error);
    }
  };

  softDelete = async (id: number): Promise<void> => {
    try {
      await this.Doctors.softDelete(id);
    } catch (error) {
      throw new Error(error);
    }
  };
}
