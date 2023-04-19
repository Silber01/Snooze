const express = require('express')
const {
  createHotel,
  getHotel,
  getHotels,
  deleteHotel,
  updateHotel,
  getRoom,
  bookHotel,
  queryHotels
} = require('../controllers/hotelController')

const router = express.Router()

// GET all hotels
router.get('/search', queryHotels)

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
router.patch('/:id/:roomid', bookHotel)

module.exports = router