import dotenv from 'dotenv';
dotenv.config();

export default {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB,
    password: process.env.PASSWORD
}