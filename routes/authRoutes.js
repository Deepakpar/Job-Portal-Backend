const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getMe } = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");

router.post("/register", (req, res, next) => {
    console.log("🔥 Register route HIT");
    next();
}, registerUser);

// REGISTER
router.post("/register", registerUser);

// LOGIN
router.post("/login", loginUser);

// GET LOGGED IN USER
router.get("/me", auth, getMe);

module.exports = router;
