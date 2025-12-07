const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    name: { type: String, required: true },

    description: { type: String },

    logo: { type: String }, // image path

    location: { type: String },

    website: { type: String },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

}, { timestamps: true });

module.exports = mongoose.model("Company", companySchema);
