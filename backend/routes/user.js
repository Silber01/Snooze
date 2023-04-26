const express = require('express')

// controller functions
const { loginUser, signupUser, editProfile, updatePoints } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

//edit profile
router.post('/editProfile', editProfile)

//update points
router.put('/updatePoints', updatePoints)

//edit 
module.exports = router