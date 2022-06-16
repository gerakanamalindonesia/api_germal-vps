const mysql = require("mysql2");
const pool = mysql.createPool({
  connectionLimit: 150,
  host: "localhost",
  user: "root",
  password: "",
  database: "db_olshop",
});

module.exports = pool;
