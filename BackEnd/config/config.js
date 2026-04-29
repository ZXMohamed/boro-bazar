import dotenv from 'dotenv';
dotenv.config();

export const data_config = {
    database: process.env.MONGO_URI || process.env.atlas_DB || 'mongodb://localhost:27017/boro_bazar',
}