const express = require("express");
const router = express.Router();

const {
  applyJob,
  getApplicants,
  updateApplicationStatus,
  getMyApplications
} = require("../controllers/applicationController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const upload = require("../utils/upload"); // multer

// APPLY TO A JOB — user only
router.post(
  "/apply/:jobId",
  auth,
  role("user"),
  upload.single("resume"),
  applyJob
);

// GET ALL APPLICANTS FOR A JOB (recruiter/admin)
router.get(
  "/applicants/:jobId",
  auth,
  role("recruiter", "admin"),
  getApplicants
);

// UPDATE APPLICATION STATUS — recruiter/admin
router.put(
  "/status/:id",
  auth,
  role("recruiter", "admin"),
  updateApplicationStatus
);

// USER: GET MY APPLICATIONS
router.get("/my", auth, role("user"), getMyApplications);

module.exports = router;
