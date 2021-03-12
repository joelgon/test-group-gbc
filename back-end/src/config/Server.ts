import express, { Application } from 'express';
import Cors from 'cors';
import { json, urlencoded } from 'body-parser';
import { Connection } from 'typeorm';

import 'reflect-metadata';
import Routes from './routes';

export class Server {
  private express: Application;
  private port: number;
  private Routes: Routes;

  constructor(connetion: Connection) {
    this.express = express();
    this.port = 3003;
    this.express.use(json());
    this.express.use(urlencoded({ extended: false }));
    this.express.use(Cors());
    this.Routes = new Routes(connetion);
    this.Routes.routes(this.express);
  }

  listen = (): void => {
    try {
      this.express.listen(this.port);
      console.log(`server listening on port: ${this.port}`);
    } catch (error) {
      throw new Error(error);
    }
  };
}
