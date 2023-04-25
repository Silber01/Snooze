const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// controller functions
const {
  loginUser,
  signupUser,
  getUser,
} = require("../controllers/userController");

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// get a users data
router.get("/getUser/:email", getUser);

module.exports = router;
