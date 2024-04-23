import * as pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const pool = new Pool({
  connectionString: process.env.PGURL,
});

// Create tickets table
pool.query(
  `CREATE TABLE IF NOT EXISTS tickets (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR NOT NULL,
    lastName VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    status VARCHAR NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`,
  (err, _res) => {
    if (err) {
      console.error('Error creating tickets table:', err);
    } else {
      console.log('Tickets table created successfully');
    }
  }
);

const query = (text: string, params?: any[]) => {
  try {
    console.log('executed query ', text);
    return pool.query(text, params);
  } catch (err) {
    console.log('Error executing query:', err);
    throw err;
  }
};

export default query;
