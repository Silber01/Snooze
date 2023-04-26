const Hotel = require('../models/hotelModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')

// get all hotels
const getAllHotels = async (req, res) => {
  const hotels = await Hotel.find({}).sort({ createdAt: -1 })

  res.status(200).json(hotels)
}

/*
run()
async function run(){
  const hotel = await Hotel.create ({
    name: "Azure Rose Hotel ",
    description: "Fancy Blue Hotel.",
    imgsrc: "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png",
    rooms:[
      
    {price:Math.floor(Math.random() * 10000), 
    roomType:"Suite",
    roomNum:Math.floor(Math.random() * 999), 
    beds: Math.floor(Math.random() * 5), 
    hasWifi: true, 
    imgsrc: "image", 
    datesBooked:[
      {firstDate:"2023-04-07",lastDate:"2023-04-10"},
      {firstDate:"2023-04-13",lastDate:"2023-04-17"},
    ]},

    {price:Math.floor(Math.random() * 10000), 
        roomType:"Suite",
        roomNum:Math.floor(Math.random() * 999), 
        beds: Math.floor(Math.random() * 5 + 1), 
        hasWifi: true, 
        imgsrc: "image", 
        datesBooked:[
          {firstDate:"2023-04-07",lastDate:"2023-04-10"},
          {firstDate:"2023-04-13",lastDate:"2023-04-17"},
        ]},
    ],
    ratings:{1:Math.floor(Math.random()* 1000), 2:Math.floor(Math.random()* 1000), 3:Math.floor(Math.random()*1000), 4:Math.floor(Math.random()*1000), 5:Math.floor(Math.random()*1000)},
    reviews:[
      {user:"test user", review: "abc", rating:4},
      {user:"test user", review: "abc", rating:4},
      {user:"test user", review: "abc", rating:4}
    ],
    location:{
      address:"test",
      city:"Milpitas",
      province:"California",
      country:"United States"
    },
  })
  await hotel.save()
  console.log(hotel)
}
*/


/**
 * Searches by location and filters by minRating and price Interval.
 * 
 * @param location
 * @param minRating
 * @param minPrice
 * @param maxPrice
 */
const getHotels = async (req, res) => {
  try {
    const location = req.body.location
    const minRating = req.body.minRating || 0
    const minPrice = req.body.minPrice || 0
    const maxPrice = req.body.maxPrice || 99999

    const matchObj = {}
    if (location.length > 0) {
      matchObj["$search"] =
      {
        index: "hotelSearch",
        text: {
          query: location,
          path: {
            wildcard: "*"
          }
        }
      }
    } else {
      matchObj["$sort"] = { createdAt: -1 }
    }

    console.log(matchObj)
    const hotel = await Hotel.aggregate([
      matchObj,
      {
        $project: {
          name: 1,
          description: 1,
          imgsrc: 1,
          ratings:
          {
            $divide: [
              {
                $sum: [
                  { $multiply: ["$ratings.2", 2] },
                  { $multiply: ["$ratings.3", 3] },
                  { $multiply: ["$ratings.4", 4] },
                  { $multiply: ["$ratings.5", 5] },
                ]
              },
              {
                $sum: [
                  "$ratings.1",
                  "$ratings.2",
                  "$ratings.3",
                  "$ratings.4",
                  "$ratings.5"
                ]
              }]
          },
          reviews: 1,
          location: 1,
          rooms: {
            $filter: {
              input: "$rooms",
              as: "room",
              cond: {
                $and: [{ $gte: ["$$room.price", minPrice] },
                { $lte: ["$$room.price", maxPrice] }]
              }
            }
          },
          score: { $meta: "searchScore" }
        },
      },
      {
        $match: {
          ratings: { $gte: minRating },
          "rooms.price": { $gte: minPrice },
          "rooms.price": { $lte: maxPrice }
        }
      }
    ])
    res.status(200).json(hotel)
  } catch (err) {
    console.log(err)
  }
}

// get a single hotel
const getHotel = async (req, res) => {
  const { hotelID } = req.body
  if (!mongoose.Types.ObjectId.isValid(hotelID)) {
    return res.status(404).json({ error: 'No such hotel' })
  }

  const hotel = await Hotel.findById(hotelID)

  if (!hotel) {
    return res.status(404).json({ error: 'No such hotel' })
  }

  res.status(200).json(hotel)
}

// get available room
const getAvailableRooms = async (req, res) => {

}

// get a single hotel room
const getRoom = async (req, res) => {
  const { hotelID } = req.body
  const { roomID } = req.body

  if (!mongoose.Types.ObjectId.isValid(hotelID) || !mongoose.Types.ObjectId.isValid(roomID)) {
    return res.status(404).json({ error: 'No such hotel' })
  }
  console.log("valid args")

  const hotel = await Hotel.find({ _id: hotelID, rooms: { $elemMatch: { _id: roomID } } }, { "rooms.$": 1 })

  res.status(200).json(hotel)
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

//Book a Hotel Room
const bookHotel = async (req, res) => {
  try {
    const { hotelID } = req.body
    const { roomID } = req.body
    const firstDate = new Date(req.body.firstDate)
    const lastDate = new Date(req.body.lastDate)

    if (!mongoose.Types.ObjectId.isValid(hotelID)) {
      return res.status(404).json({ error: 'No such hotel' })
    }
    if (lastDate == "Invalid Date" || firstDate == "Invalid Date") {
      return res.status(400).json({ error: 'Invalid First or Last Date.' })
    }
    if (lastDate.valueOf() <= firstDate.valueOf()) {
      return res.status(400).json({ error: 'Last date is before or during first date.' })
    }
    if (firstDate.valueOf <= new Date().valueOf()) {
      return res.status(400).json({ error: 'First Date is before today.' })
    }

    const dataCheck = await Hotel.find({
      _id: hotelID,
      'rooms._id': roomID,
      'rooms.datesBooked.firstDate': { $lte: lastDate },
      'rooms.datesBooked.lastDate': { $gte: firstDate }
    })

    if (dataCheck.length != 0) {
      return res.status(400).json({ error: 'Date conflicts with a booked room.' })
    }



    var authorization = req.headers.authorization.split(" ")[1]
    const [, auth,] = authorization.split(".")
    var userId = atob(auth)
    userId = userId.substring(8, 32);
    var body = req.body;
    body.userId = userId;
    console.log("VALID. ADDING TO DB")
    const hotel = await Hotel.findOneAndUpdate({ _id: hotelID, "rooms._id": roomID }, {
      $push: {
        "rooms.$[i].datesBooked": body
      }
    },
      {
        arrayFilters: [
          { "i._id": roomID }
        ]
      },
    )

    if (!hotel) {
      return res.status(400).json({ error: 'Failed to update hotel' })
    }

    body = req.body
    body.hotelID = hotelID
    body.roomID = roomID
    const findPrice = await Hotel.findOne({ _id: hotelID, rooms: { $elemMatch: { _id: roomID } } }, { "rooms.$": 1 })
    body.price = findPrice.rooms[0].price

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ error: 'Error finding user.' })
    }

    //Adds to user db.
    const user = await User.findOneAndUpdate({ _id: userId }, {
      $push: {
        bookings: body
      }
    })

    res.status(200).json("update sucessful")
  } catch (err) {
    console.log(err)
  }
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

const addReview = async (req, res) => {
  var authorization = req.headers.authorization.split(' ')[1]
  const [, auth,] = authorization.split(".")
  var userIds = atob(auth);
  userIds = userIds.substring(8, 32);
  var body = req.body;
  const id = body.hotelId;
  delete body.hotelId;
  body.userId = userIds;

  const userReview = await Hotel.findById({ _id: id }).find({ 'reviews': { $elemMatch: { userId: userIds } } });
  console.log(JSON.stringify(userReview).includes("review"));
  if (JSON.stringify(userReview).includes("review")) {
    res.status(409).json("REVIEW ALREADY EXISTS");
  }
  else {
    const hotel = await Hotel.findByIdAndUpdate({ _id: id }, {
      $push: {
        "reviews": body
      }
    })
  }
  res.status(200).json(userReview);
}

const addRating = async (req, res) => {
  var authorization = req.headers.authorization.split(' ')[1];
  const [, auth,] = authorization.split(".")
  var userId = atob(auth);
  userId = userId.substring(8, 32);
  var body = req.body
  const id = body.hotelId;
  delete body.hotelId;
  body.userId = userId;

  const hotel = await Hotel.findByIdAndUpdate({ _id: id }, {
    $inc: {
      [`ratings.${body.rating}`]: 1
    }
  })
  res.status(200).json(hotel);
}


module.exports = {
  getAllHotels,
  getHotels,
  getHotel,
  deleteHotel,
  updateHotel,
  getRoom,
  bookHotel,
  addReview,
  getAvailableRooms,
  addRating,
}