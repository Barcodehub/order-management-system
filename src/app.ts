import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'express-async-errors';
import { errorHandler } from './middlewares/error.middleware';
import router from './routes';
import { logger } from './utils/logger';
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

export const createApp = () => {
  const app = express();

  // Middlewares
  app.use(cors({
    origin: process.env.FRONTEND // o el puerto de tu frontend
  }));
  app.use(express.json());
  app.use(morgan('dev'));

  // Routes
  app.use('/api', router);

  // Error handling
  app.use(errorHandler);

  return app;
};