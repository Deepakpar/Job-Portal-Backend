const Application = require("../models/Application");
const Job = require("../models/Job");

// APPLY TO JOB
exports.applyJob = async (req, res) => {
    try {

         console.log("🔥 ID received from Postman:", req.params.id);

        const check = await Application.findById(req.params.id);
        console.log("🔥 App found:", check);

        const jobId = req.params.jobId;

        // prevent duplicate applications
        const existing = await Application.findOne({
            job: jobId,
            applicant: req.user.id
        });

        if (existing)
            return res.status(400).json({ message: "Already applied to this job" });

        const resumePath = req.file ? req.file.path : null;

        const app = await Application.create({
            job: jobId,
            applicant: req.user.id,
            resume: resumePath
        });

        // increase application count
        await Job.findByIdAndUpdate(jobId, { $inc: { applicationsCount: 1 } });

        res.status(201).json({ message: "Application submitted", application: app });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET APPLICANTS FOR A JOB (recruiter/admin)
exports.getApplicants = async (req, res) => {
    try {
        const applicants = await Application
            .find({ job: req.params.jobId })
            .populate("applicant", "name email skills")
            .populate("job", "title");

        res.json(applicants);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE APPLICATION STATUS
exports.updateApplicationStatus = async (req, res) => {
    try {
        const app = await Application.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        res.json({ message: "Status updated", application: app });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET USER'S OWN APPLICATIONS
exports.getMyApplications = async (req, res) => {
    try {
        const apps = await Application
            .find({ applicant: req.user.id })
            .populate("job", "title company location salary");

        res.json(apps);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
