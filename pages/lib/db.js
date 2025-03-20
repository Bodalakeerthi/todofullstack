import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'keerthi123',
  database: 'next',
});

export default pool;
