const { Pool } = require("pg");
require("dotenv").config();

const connectionString = process.env.DB_STRING;

const pool = new Pool({
  connectionString,
});

module.exports = pool;
