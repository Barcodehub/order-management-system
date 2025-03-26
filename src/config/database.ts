import mongoose from 'mongoose';
import { logger } from '../utils/logger';
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();



export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error}`);
    process.exit(1);
  }
};