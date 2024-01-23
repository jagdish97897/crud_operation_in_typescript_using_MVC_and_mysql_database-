
// Config/database.ts

import mysql from 'mysql2/promise';

let pool: mysql.Pool;

export const connectDB = async (): Promise<mysql.Pool> => {
  try {
    if (!pool) {
      pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'crud',
        connectionLimit: 10, // Adjust the limit as needed
      });

      console.log('Connected to MySQL');
    }

    return pool;
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
    throw error;
  }
};


