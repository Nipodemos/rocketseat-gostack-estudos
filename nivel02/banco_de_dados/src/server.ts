import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';
import 'reflect-metadata';
import './database/index';

import routes from './routes';
import uploadConfig from './config/uploads';
import AppError from './errors/AppError';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, _: Request, response: Response, __: NextFunction) => {
  if (err instanceof AppError) {
    response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('servidor iniciou na porta 3333');
});
