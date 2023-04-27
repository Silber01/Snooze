const express = require('express')

// controller functions
const { loginUser, signupUser, editProfile, updatePoints, getBookings, changeBooking, cancelBooking} = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

//get bookings
router.get('/getbookings', getBookings)

//change bookings
router.patch('/changebooking', changeBooking)

//cancel bookings
router.patch('/cancelbooking', cancelBooking)

//edit profile
router.patch('/editprofile', editProfile)

//update points
router.put('/updatepoints', updatePoints)

module.exports = router