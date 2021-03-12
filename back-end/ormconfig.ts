import * as dotenv from 'dotenv';

dotenv.config();

export default [
  {
    name: 'db1Connection',
    type: 'mysql',
    host: process.env.Hostname,
    port: process.env.Port,
    username: process.env.User,
    password: process.env.Password,
    database: process.env.Database,
    migrations: ['./src/migrations/*.ts'],
    entities: ['./src/models/**.ts'],
    cli: {
      migrationsDir: './src/migrations/',
      entitiesDir: './src/models/',
    },
  },
];
