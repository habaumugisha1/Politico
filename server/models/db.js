import { Pool } from 'pg';
import config from './dbConfig';

 export const pool = new Pool(config)

 pool.on('connect', () => {
    console.log('connected to the database successful!');
});



// module.exports = {createTables}


