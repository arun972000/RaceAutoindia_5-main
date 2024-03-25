import mysql from 'mysql2/promise';

// Create the connection to database
const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'race_india',
});

console.log('Connected to MySQL database');

export default db