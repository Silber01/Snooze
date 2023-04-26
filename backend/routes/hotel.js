const express = require('express')
const {
  getAllHotels,
  getHotels,
  getHotel,
  createHotel,
  deleteHotel,
  updateHotel,
  getRoom,
  bookHotel,
  addReview,
  addDateToUser,
  getAvailableRooms,
  addRating,
} = require('../controllers/hotelController')

const router = express.Router()

// GET all hotels
router.get('/', getAllHotels)

// GET search hotels
router.get('/search', getHotels)

//GET a single hotel
router.get('/:id', getHotel)

//GET a single room
router.get('/:id/:roomid', getRoom)

// POST a new hotel
//router.post('/', createHotel)

// DELETE a hotel
//router.delete('/:id', deleteHotel)

// UPDATE a hotel
//router.patch('/:id', updateHotel)

//Book a Hotel Room
router.patch('/booking/:id/:roomid', bookHotel)

//Test add review to User
router.patch('/test', addDateToUser)

//Add Review
router.put('/review', addReview);

//Add Rating
router.put('/rating', addRating)

module.exports = router