const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// controller functions
const {
  loginUser,
  signupUser,
  getUser,
  editProfile,
  updatePoints,
  getBookings,
  changeBooking,
  cancelBooking,
} = require("../controllers/userController");

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// get a users data
router.get("/getUser/:email", getUser);

// merge from will

//get bookings
router.get("/getbookings", getBookings);

//change bookings
router.patch("/changebooking", changeBooking);

//cancel bookings
router.patch("/cancelbooking", cancelBooking);

//edit profile
router.patch("/editprofile", editProfile);

//update points
router.put("/updatepoints", updatePoints);

module.exports = router;

module.exports = router;
