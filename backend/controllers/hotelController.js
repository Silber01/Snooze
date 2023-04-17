const Hotel = require('../models/hotelModel')
const mongoose = require('mongoose')

// get all hotels
const getHotels = async (req, res) => {
  const hotels = await Hotel.find({}).sort({ createdAt: -1 })

  res.status(200).json(hotels)
}

// get a single hotel
const getHotel = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such hotel' })
  }

  const hotel = await Hotel.findById(id)

  if (!hotel) {
    return res.status(404).json({ error: 'No such hotel' })
  }

  res.status(200).json(hotel)
}

// get a single hotel room
const getRoom = async (req, res) => {
  const { id } = req.params
  const { roomid } = req.params
  console.log(roomid)

  if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(roomid)) {
    return res.status(404).json({ error: 'No such hotel' })
  }
  console.log("valid args")

  const hotel = await Hotel.find({_id: id, 'rooms._id': {$in: roomid}}, {rooms: {$elemMatch: {_id: roomid}}})

  /*
  const hotel = await Hotel.aggregate([
    { $match: {_id: id, 'rooms._id': {$eq: roomid}}}
  ])
  if (!hotel) {
    return res.status(404).json({ error: 'No such hotel' })
  }
  */

  res.status(200).json(hotel)
}

// create new hotel
const createHotel = async (req, res) => {
  const { name, location, rooms } = req.body

  let emptyFields = []

  if (!name) {
    emptyFields.push('name')
  }
  if (!location) {
    emptyFields.push('location')
  }
  if (!rooms) {
    emptyFields.push('rooms')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const hotel = await Hotel.create({ name, location, rooms })
    res.status(200).json(hotel)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a hotel
const deleteHotel = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such hotel' })
  }

  const hotel = await Hotel.findOneAndDelete({ _id: id })

  if (!hotel) {
    return res.status(400).json({ error: 'No such hotel' })
  }

  res.status(200).json(hotel)
}

// update a hotel
const updateHotel = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such hotel' })
  }

  const hotel = await Hotel.findOneAndUpdate({ _id: id }, {
    ...req.body
  })

  if (!hotel) {
    return res.status(400).json({ error: 'No such hotel' })
  }

  res.status(200).json(hotel)
}

//Book a Hotel Room
const bookHotel = async (req, res) => {
  const { id } = req.params
  const { roomid } = req.params

  console.log(req.params)
  console.log("logging")
  console.log(req.body)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such hotel' })
  }

  //const hotel = await Hotel.findById({_id: id, 'rooms.id': roomid})

  const hotel = await Hotel.findOneAndUpdate({_id: id, rooms:{$elemMatch:{id: roomid}}}, {$set: {rooms}})

  if (!hotel) {
    return res.status(400).json({ error: 'No such hotel' })
  }

  res.status(200).json(hotel)
}




module.exports = {
  getHotel,
  getHotels,
  createHotel,
  deleteHotel,
  updateHotel,
  getRoom,
  bookHotel
}