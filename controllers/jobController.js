const Job = require("../models/Job");
const Company = require("../models/Company");

// CREATE JOB
exports.createJob = async (req, res) => {
    try {
        const job = await Job.create({
            ...req.body,
            postedBy: req.user.id
        });

        res.status(201).json({ message: "Job created", job });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET ALL JOBS
exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find()
            .populate("company", "name logo")
            .populate("postedBy", "name");

        res.json(jobs);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET JOB BY ID
exports.getJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate("company", "name description logo location")
            .populate("postedBy", "name email");

        if (!job) return res.status(404).json({ message: "Job not found" });

        res.json(job);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE JOB
exports.updateJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({ message: "Job updated", job });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE JOB
exports.deleteJob = async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.json({ message: "Job deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
