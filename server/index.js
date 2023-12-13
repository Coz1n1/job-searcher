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

app.post("/addCompanyOffer", (req, res) => {
  const {
    title,
    description,
    technologies,
    salary,
    experience,
    companyName,
    location,
    operatingMode,
    typeOfWork,
  } = req.body;
  pool.query(
    "INSERT INTO jobs(title,description,technologies,salary,experience,company_name,location,operating_mode,type_of_work) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)",
    [
      title,
      description,
      technologies,
      salary,
      experience,
      companyName,
      location,
      operatingMode,
      typeOfWork,
    ]
  );
  res.json({ com: "added" });
});

app.post("/deleteOffer", (req, res) => {
  const { id } = req.body;
  pool.query("DELETE FROM jobs where id=$1", [id]);
});

app.get("/getAll", async (req, res) => {
  const offers = await pool.query("SELECT * FROM jobs");
  res.json({ offers: offers.rows });
});

app.post("/delete", (req, res) => {
  pool.query("DELETE FROM jobs");
});

app.post("/getSpecifiedJobData", async (req, res) => {
  const { id } = req.body;
  const offer = await pool.query("SELECT * FROM jobs WHERE id=$1", [id]);
  res.json({ jobData: offer.rows[0] });
});

app.listen(process.env.PORT || 3002, () => {
  console.log("running 3002");
});
