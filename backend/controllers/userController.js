const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

/*
run()
async function run(){
  const user = await User.create ({
    email:"bingbonger@gmail.com",
    password:"randomhash",
    firstName:"aownd",
    lastName:"bob",
  })
  await user.save()
  console.log(user)
}
*/


// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)
    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password, firstName, lastName} = req.body

  try {
    const user = await User.signup(email, password, firstName, lastName)

    // create a token
    const token = createToken(user._id)
    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


//curently takes userid from body.
//I need user authentication from jwt token in header.
const editProfile = async (req, res) => {
  var authorization = req.headers.authorization.split(" ")[1]
  const [, auth,] = authorization.split(".")
  var userId = atob(auth)
  userId = userId.substring(8, 32);

  const {imgsrc, email, firstName, lastName, password} = req.body
  console.log(req.body)
  if (password){
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
  }

  try{
    const user = await User.findOneAndUpdate({_id: userId}, req.body)
    res.status(200).json(user)
  } catch(error){
    res.status(400).json({error: error.message})
  }
}


//curently takes userid from body.
//I need user authentication from jwt token in header.
const getBookings = async (req, res) => {
  const {_id, imgsrc} = req.body

  try{
    const user = await User.findOneAndUpdate({_id: _id}, req.body)
    res.status(200).json(user)
  } catch(error){
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser, editProfile}