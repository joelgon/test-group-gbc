import { Connection } from 'typeorm';
import { Request, Response } from 'express';
import { DoctorRepository, IDoctorReq } from '../repository/DoctorRepository';
import { DoctorspecialtyRepository } from '../repository/DoctorspecialtyRepository';
import {
  ISpecialty,
  SpecialtiesRepository,
} from '../repository/SpecialtiesRepository';

interface IBody {
  doctor: IDoctorReq;
  doctorspecialtyId?: number;
  specialty?: ISpecialty;
}

export class DoctorsController {
  private DoctorRepository: DoctorRepository;
  private DoctorspecialtyRepository: DoctorspecialtyRepository;
  private SpecialtiesRepository: SpecialtiesRepository;

  constructor(connection: Connection) {
    this.DoctorRepository = new DoctorRepository(connection);
    this.DoctorspecialtyRepository = new DoctorspecialtyRepository(connection);
    this.SpecialtiesRepository = new SpecialtiesRepository(connection);
  }

  index = async (req: Request, res: Response): Promise<Response> => {
    try {
      const response = await this.DoctorRepository.findAll();
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    const params: IBody = req.body;
    try {
      if (
        (params.doctorspecialtyId === undefined &&
          params.specialty === undefined) ||
        (params.doctorspecialtyId !== undefined &&
          params.specialty !== undefined)
      ) {
        return res.status(400).json({ message: 'malformed request body' });
      }

      const response = await this.DoctorRepository.createDoctor(params.doctor);

      if (params.doctorspecialtyId !== undefined) {
        await this.DoctorspecialtyRepository.create({
          doctorId: response.id,
          specialtyId: params.doctorspecialtyId,
        });
      }

      if (params.specialty !== undefined) {
        const specialty = await this.SpecialtiesRepository.create(
          params.specialty,
        );
        await this.DoctorspecialtyRepository.create({
          doctorId: response.id,
          specialtyId: specialty.id,
        });
      }
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  show = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const response = await this.DoctorRepository.findOne(+id);

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const params: IDoctorReq = req.body;
    try {
      const response = await this.DoctorRepository.update(+id, params);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  softDelete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      await this.DoctorRepository.softDelete(+id);
      return res.status(200).json({ message: 'OK' });
    } catch (error) {
      return res.status(500).json(error);
    }
  };
}
