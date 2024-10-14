import { config } from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { User } from '../models/user.entity';
import { Theater } from '../models/theater.entity';
import { Ticket } from '../models/ticket.entity';
import { City } from '../models/city.entity';
import { Detail } from '../models/detail.entity';

config();

// Read variables from .env
export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Ticket, Theater, City, Detail],
  migrationsTableName: 'migrations',
  migrations: [join(__dirname, '../migrations/**/*.js')],
  synchronize: false,
});

// Version1
// export default new DataSource({
//   type: 'mysql',
//   host: process.env.DB_HOST || '127.0.0.1',
//   port: Number(process.env.DB_PORT) || 3307,
//   username: process.env.DB_USERNAME || 'root',
//   password: process.env.DB_PASSWORD || 'root',
//   database: process.env.DB_DATABASE || 'fixthaonhi',
//   entities: [User, Ticket, Theater, City, Detail],
//   migrationsTableName: 'migrations',
//   migrations: [join(__dirname, '../migrations/**/*.js')],
//   synchronize: false,
// });

// old code
// export default new DataSource({
//   type: 'mysql',
//   host: process.env.DB_HOST,
//   port: 3307,
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   entities: [User, Ticket, Theater, City, Detail],
//   migrationsTableName: 'migrations',
//   migrations: [join(__dirname, '../../src/migrations/**/*.{js,ts}')],
//   synchronize: false,
// });
