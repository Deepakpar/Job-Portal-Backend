const Company = require("../models/Company");
const Job = require("../models/Job");

// CREATE COMPANY
exports.createCompany = async (req, res) => {
    try {
        const company = await Company.create({
            ...req.body,
            createdBy: req.user.id
        });

        res.status(201).json({ message: "Company created", company });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET COMPANY DETAILS
exports.getCompany = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);

        if (!company) return res.status(404).json({ message: "Company not found" });

        res.json(company);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE COMPANY
exports.updateCompany = async (req, res) => {
    try {
        const company = await Company.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({ message: "Company updated", company });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET JOBS POSTED BY COMPANY
exports.getCompanyJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ company: req.params.id });

        res.json(jobs);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
