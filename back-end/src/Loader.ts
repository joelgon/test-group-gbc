import { connection } from './config/Database';
import { Server } from './config/Server';

const run = async () => {
  const conn = await connection();
  const server = new Server(conn);
  server.listen();
};

run();
