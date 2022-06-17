const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "germal",
  password: "gabug123",
  port: 5432,
  database: "db_olshop",
});

module.exports = pool;
