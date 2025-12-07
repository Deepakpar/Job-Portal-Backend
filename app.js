const express = require('express');
const cors = require("cors");

const cookieParser = require('cookie-parser');

// Routers
const authRouter = require('./routes/authRoutes');
const jobRouter = require('./routes/jobRoutes');
const companyRouter = require('./routes/companyRoutes');
const applicationRouter = require('./routes/applicationRoutes');

const app = express();

// Middlewares
app.use(cors({
    origin: [
      "http://localhost:5176",
      "https://jobportaldep.netlify.app/login"
    ],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Static folder for resume uploads
app.use('/uploads', express.static('uploads'));

// API Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobRouter);
app.use('/api/v1/company', companyRouter);
app.use('/api/v1/applications', applicationRouter);

// Default route
app.get("/", (req, res) => {
    res.send("Job Portal Backend is Running...");
});

// Global error handler (optional but recommended)
app.use((err, req, res, next) => {
    console.error("ERROR:", err.stack);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
});

module.exports = app;
