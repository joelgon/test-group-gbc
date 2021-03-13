import { Connection } from 'typeorm';
import { Request, Response } from 'express';
import { SpecialtiesRepository } from '../repository/SpecialtiesRepository';

export class SpecialtiesController {
  private SpecialtiesRepository: SpecialtiesRepository;
  constructor(connection: Connection) {
    this.SpecialtiesRepository = new SpecialtiesRepository(connection);
  }

  index = async (req: Request, res: Response): Promise<Response> => {
    try {
      const response = await this.SpecialtiesRepository.findAll();
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    const params = req.body;
    try {
      const response = await this.SpecialtiesRepository.create(params);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  show = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const response = await this.SpecialtiesRepository.findOne(+id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const params = req.body;
    try {
      await this.SpecialtiesRepository.update(id, params);
      return res.status(200).json({ message: 'OK' });
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      await this.SpecialtiesRepository.delete(id);
      return res.status(200).json({ message: 'OK' });
    } catch (error) {
      return res.status(500).json(error);
    }
  };
}
