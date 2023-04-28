const express = require("express");
const {
  createHotel,
  getHotel,
  getHotels,
  getAllHotels,
  deleteHotel,
  updateHotel,
  getRoom,
  bookHotel,
  addReview,
  getAvailableRooms,
  addRating,
  generateHotel
} = require("../controllers/hotelController");

const router = express.Router();

// GET all hotels
router.get("/", getAllHotels);

// merge from will

// GET search hotels
router.get("/search", getHotels);

//GET a single hotel
router.get("/gethotel", getHotel);

//GET a single room
router.get("/getroom", getRoom);

//Book a Hotel Room
router.patch("/booking", bookHotel);

//Add Review
router.put("/review", addReview);

//Add Rating
router.put("/rating", addRating);

// Generate a hotel
router.put("/generate", generateHotel);

module.exports = router;

module.exports = router;
