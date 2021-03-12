import { Application } from 'express';
import { Connection } from 'typeorm';
import { DoctorsController } from '../controllers/DoctorsController';

export default class Routes {
  private DoctorsController: DoctorsController;
  constructor(connection: Connection) {
    this.DoctorsController = new DoctorsController(connection);
  }

  routes = (server: Application): void => {
    server
      .route('/doctors')
      .get(this.DoctorsController.index)
      .post(this.DoctorsController.create);

    server
      .route('/:id/doctors')
      .get(this.DoctorsController.show)
      .put(this.DoctorsController.update)
      .delete(this.DoctorsController.softDelete);
  };
}
