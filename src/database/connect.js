// require('dotenv').config();

// const mysql = require('mysql2');
// var fs = require('fs');

// async function connection() {
//   const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DATABASE,
//     ssl: {
//       ca: fs.readFileSync(__dirname + '/ca.pem').toString(),
//       rejectUnauthorized: false,
//     },
//   });

//   db.connect((err) => {
//     if (err) {
//       console.log('Error connecting to the database:', err);
//       return;
//     }
//     console.log('Connection to the database was successful');
//   });
// }

// module.exports = connection;

require('dotenv').config();

const mysql = require('mysql2');
var fs = require('fs');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  ssl: {
    ca: fs.readFileSync(__dirname + '/ca.pem').toString(),
    rejectUnauthorized: false,
  },
});

module.exports = db;
