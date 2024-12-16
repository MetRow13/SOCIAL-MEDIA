const mysql = require('mysql2');

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // MINE  MySQL username
  password: '123456',  // MINE your MySQL password
  database: 'Social_Media',
});

db.connect(err => {
  if (err) {
      console.error('Database connection error: ' + err.stack);
      return;
  }
  console.log('Connected to the database.');
});

module.exports = db;
