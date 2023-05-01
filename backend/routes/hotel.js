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
  generateHotel,
  checkHotel,
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

router.get("/checkhotel", checkHotel);

//Add Review
router.put("/review", addReview);

// Generate a hotel
router.put("/generate", generateHotel);

module.exports = router;

module.exports = router;
