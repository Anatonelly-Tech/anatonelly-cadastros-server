require('dotenv').config();

const mysql = require('mysql2');
var fs = require('fs');

var pool = mysql.createPool({
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

exports.pool = pool;










// require('dotenv').config();

// const mysql = require('mysql2');
// var fs = require('fs');

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DATABASE,
//   ssl: {
//     ca: fs.readFileSync(__dirname + '/ca.pem').toString(),
//     rejectUnauthorized: false,
//   },
// });

// module.exports = db;
