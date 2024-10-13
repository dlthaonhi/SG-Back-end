// import {config} from 'dotenv';
// import {join} from 'path';
// import {DataSource} from 'typeorm';
// import {User} from '../models/user.entity'
// import {Theater} from '../models/theater.entity';
// import { Ticket } from '../models/ticket.entity';
// import { City } from '../models/city.entity';
// import { Detail } from '../models/detail.entity';

// // require('dotenv').config({ path: join(__dirname, '../.env') });

// config();
// export default new DataSource({
//   type: 'mysql',
//   host: process.env.DB_HOST,
//   port: 3306,
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   entities: [User, Ticket, Theater, City, Detail],
//   migrationsTableName: 'migrations',
//   migrations: [join(__dirname, '../../src/migrations/**/*.{js,ts}')],
//   synchronize: false,
// });