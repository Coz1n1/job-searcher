const { Pool } = require("pg");

const connectionString =
  "postgresql://postgres:G366b4eGFbFc3A-fGEDg4G5GE5ga5dd6@roundhouse.proxy.rlwy.net:44365/railway";

const pool = new Pool({
  connectionString,
});

module.exports = pool;
