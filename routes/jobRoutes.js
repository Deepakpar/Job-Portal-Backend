const express = require("express");
const router = express.Router();

const {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob
} = require("../controllers/jobController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// CREATE JOB — Recruiter only
router.post("/", auth, role("recruiter", "admin"), createJob);

// GET ALL JOBS
router.get("/", getJobs);

// GET SINGLE JOB
router.get("/:id", getJob);

// UPDATE JOB
router.put("/:id", auth, role("recruiter", "admin"), updateJob);

// DELETE JOB
router.delete("/:id", auth, role("recruiter", "admin"), deleteJob);

module.exports = router;
