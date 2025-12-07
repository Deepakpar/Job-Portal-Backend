const mongoose = require("mongoose");
const { MONGODB_URI, PORT } = require("./utils/config");
const app = require("./app");

const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const finalPort = process.env.PORT || PORT || 3001;

    app.listen(finalPort, () => {
      console.log(`Server running on port ${finalPort}`);
    });

  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
  }
};

startServer();
