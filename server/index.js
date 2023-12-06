const express = require("express");
const pool = require("./db");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
app.use(cors());

app.post("/companyOffers", async (req, res) => {
  const { company } = req.body;
  const jobs = await pool.query("SELECT * FROM jobs WHERE company_name=$1", [
    company,
  ]);
  res.json({ jobs: jobs.rows });
});

app.listen(process.env.PORT || 3002, () => {
  console.log("running 3002");
});
