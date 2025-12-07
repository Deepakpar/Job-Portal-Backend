const mongoose = require("mongoose");
const { MONGODB_URI } = require("./utils/config");
const app = require("./app");

// IMPORTANT: PORT must ONLY come from process.env, not config.js
const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

startServer();

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("🚨 UNHANDLED REJECTION:", err.message);
  process.exit(1);
});
