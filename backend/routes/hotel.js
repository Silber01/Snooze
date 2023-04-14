const express = require('express')
const {
  createHotel,
  getHotel,
  getHotels,
  deleteHotel,
  updateHotel
} = require('../controllers/hotelController')

const router = express.Router()

// GET all hotels
router.get('/', getHotels)

//GET a single hotel
router.get('/:id', getHotel)

// POST a new hotel
router.post('/', createHotel)

// DELETE a hotel
router.delete('/:id', deleteHotel)

// UPDATE a hotel
router.patch('/:id', updateHotel)


module.exports = router