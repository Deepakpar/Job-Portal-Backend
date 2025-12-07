const express = require("express");
const router = express.Router();

const {
  createCompany,
  getCompany,
  updateCompany,
  getCompanyJobs
} = require("../controllers/companyController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// CREATE COMPANY — recruiter only
router.post("/", auth, role("recruiter", "admin"), createCompany);

// GET COMPANY DETAILS
router.get("/:id", getCompany);

// UPDATE COMPANY — recruiter/admin
router.put("/:id", auth, role("recruiter", "admin"), updateCompany);

// GET ALL JOBS POSTED BY A COMPANY
router.get("/:id/jobs", getCompanyJobs);

module.exports = router;
