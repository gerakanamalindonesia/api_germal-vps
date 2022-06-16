const mysql = require("mysql2");
const pool = mysql.createPool({
  connectionLimit: 150,
  host: "localhost",
  user: "germal",
  password: "gabug123",
  database: "db_olshop",
});

module.exports = pool;
