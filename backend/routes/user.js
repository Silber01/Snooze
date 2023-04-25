const express = require('express')

// controller functions
const { loginUser, signupUser, editProfile } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

//edit profile
router.post('/editProfile', editProfile)

//edit 
module.exports = router