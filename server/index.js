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

app.post("/applyForOffer", (req, res) => {
  const { id, userName, userEmail, additionalInfo, file } = req.body;
  pool.query(
    "INSERT INTO applications(id,user_name,user_email,additional_info,file) VALUES($1,$2,$3,$4,$5)",
    [id, userName, userEmail, additionalInfo, file]
  );
});

app.post("/getCompanyApplicants", async (req, res) => {
  const { id } = req.body;
  const applicants = await pool.query(
    "SELECT * FROM applications WHERE id=$1",
    [id]
  );
  res.json({ applicants: applicants.rows });
});

app.post("/filterData", async (req, res) => {
  const { typeOfWork, operatingMode, technology, experience } = req.body;
  console.log(typeOfWork, operatingMode, experience, technology);
  const jobs = await pool.query(
    "SELECT * FROM jobs,json_array_elements(jobs.technologies) obj WHERE type_of_work=$1 AND operating_mode=$2 AND experience=$3 AND obj->>'value'=$4",
    [typeOfWork, operatingMode, experience, technology]
  );
  console.log(jobs.rows);
  res.json({ jobs: jobs.rows });
});

app.post("/change", (req, res) => {
  pool.query("ALTER TABLE jobs ALTER COLUMN operating_mode TYPE json");
});

app.listen(process.env.PORT || 3002, () => {
  console.log("running 3002");
});
