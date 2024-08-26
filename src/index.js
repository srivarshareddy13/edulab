require('reflect-metadata');
const express = require('express');
const { createConnection } = require('typeorm');
import bookEntity from './entities/Book';
import authorEntity from './entities/Author';
import userEntity from './entities/User';
import auditLogEntity from './entities/AuditLog';
import libraryController from './controllers/LibraryController';

const app = express();
app.use(express.json());

// Routes
app.use('/api', libraryController);

// Database connection
createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres13',
  database: 'postgres',
  synchronize: true,
  logging: false,
  entities: [
    bookEntity,
    authorEntity,
    userEntity,
    auditLogEntity,
  ],
})
  .then(() => {
    app.listen(4000, () => {
      console.log('Server is running on http://localhost:4000');
    });
  })
  .catch((error) => console.log(error));
