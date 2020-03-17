import { Pool } from 'pg';
import config from './dbConfig';

// const connString = "postgres://proccess.env.DB_USER:proccess.env.PASSWORD@proccess.env.DB_HOST:5432/proccess.env.DB"
const connString =process.env.DATABASE_URL || config

export const pool = new Pool(connString)

 pool.on('connect', () => {
    console.log('connected to the database successful!');
});



// module.exports = {createTables}


