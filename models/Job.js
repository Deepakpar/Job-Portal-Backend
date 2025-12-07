const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true, text: true },
    description: { type: String, required: true, text: true },
    
    requirements: [{ type: String }],
    skills: [{ type: String, index: true }],

    salary: {
        min: { type: Number },
        max: { type: Number },
        currency: { type: String, default: 'USD' },
    },

    location: {
        type: String,
        required: true,
        index: true,
    },

    jobType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'],
        default: 'Full-time',
    },

    experienceLevel: {
        type: String,
        enum: ['Entry', 'Junior', 'Mid', 'Senior', 'Lead', 'Executive'],
        default: 'Entry',
    },

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },

    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    applicationDeadline: { type: Date },

    isActive: { type: Boolean, default: true },

    // ATS analytics
    applicationsCount: { type: Number, default: 0 },
    views: { type: Number, default: 0 },

}, { timestamps: true });

// Add text indexes for search
jobSchema.index({ title: 'text', description: 'text', skills: 'text' });

module.exports = mongoose.model('Job', jobSchema, 'jobs');
