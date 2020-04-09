// import make-runnable from 'make-runnable'
import { pool } from './db'
export const createTables = () => {
    const tables = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(50) NOT NULL,
        otherName VARCHAR(50) NULL,
        lastName VARCHAR(50) NOT NULL,
        passportUrl VARCHAR(500) NOT NULL,
        email VARCHAR(150) NOT NULL,
        password VARCHAR(1024) NOT NULL,
        isAdmin BOOLEAN NOT NULL DEFAULT false,
        userRole VARCHAR(10) NOT NULL DEFAULT 'user',
        createdOn TIMESTAMP NOT NULL
    ); 
    CREATE TABLE IF NOT EXISTS party(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        hdAdress VARCHAR(50) NOT NULL,
        logoUrl VARCHAR(500) NOT NULL,
        createdOn TIMESTAMP NOT NULL
    ); CREATE TABLE IF NOT EXISTS
    offices(
        id SERIAL PRIMARY KEY,
        type VARCHAR(100) NOT NULL,
        name VARCHAR(100) NOT NULL,
        createdOn TIMESTAMP NOT NULL
    ); 
    CREATE TABLE IF NOT EXISTS candidates(
        id SERIAL PRIMARY KEY,
        office INT NOT NULL,
        party INT NOT NULL,
        candidate INT NOT NULL,
        careatedOn TIMESTAMP NOT NULL,
        FOREIGN KEY (office) REFERENCES offices(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (party) REFERENCES party(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (candidate) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
    ); 
    CREATE TABLE IF NOT EXISTS votes(
        id SERIAL PRIMARY KEY,
        date DATE NOT NULL DEFAULT CURRENT_DATE,
        office INT NOT NULL,
        candidate INT NOT NULL,
        votedBy INT NOT NULL,
        votes INT NULL DEFAULT '0',
        FOREIGN KEY (office) REFERENCES offices(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (candidate) REFERENCES candidates(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (votedBy) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
    ); CREATE TABLE IF NOT EXISTS
    petition(
        id SERIAL PRIMARY KEY,
        date DATE NOT NULL DEFAULT CURRENT_DATE,
        createBy VARCHAR(100) NOT NULL,
        office INT NOT NULL,
        body VARCHAR(100) NOT NULL,
        proof VARCHAR(1024) NOT NULL,
        FOREIGN KEY (office) REFERENCES offices(id) ON DELETE CASCADE ON UPDATE CASCADE
    );`;

    pool.query(tables)
        .then((res) => {
            // console.log(res);
            pool.end()

        }).catch((err) => {
            console.log(err);
            pool.end();
        });
};

export const dropTables = () => {
    const queryText = 'DROP TABLE IF EXISTS users';
    pool.query(queryText)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
  }

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
  });

//   createTables();
//   dropTables();

  
require('make-runnable');