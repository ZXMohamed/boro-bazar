import dotenv from 'dotenv';
dotenv.config();

export const data_config = {
    database: process.env.MONGO_URI
}