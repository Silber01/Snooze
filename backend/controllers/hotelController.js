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




// get hotels
// Currently logs the query map. Needs to be removed later.

/**
 * Handles hotel query from get request.
 * 
 * @param page        //page number
 * @param limit       //page limit
 * @param name        //hotel name
 * @param country     //country name
 * @param province    //province name
 * @param city        //city name
 * @param ratings     //minimum ratings
 * @param startPrice  //starting price
 * @param endPrice    //endPrice
 * @param sort        //sort param
 *     
 * //Sorting Rules
     * ID 1 = Price Sort Descending
     * ID 2 = Price Sort Ascending
     * ID 3 = Rating sort Descending
     * ID 4 = Rating sort Ascending
 * 
 * Ex:
 * http://localhost:4000/api/hotel/search?page=1&limit=10&country=Philip&province=Manila&sort=2
 */
const getHotels = async (req, res) => {
  try {

    //Define Page Limits and Query Params
    const page = parseInt(req.body.page) - 1 || 0
    const limit = parseInt(req.body.limit) || 10
    const nameQuery = req.body.name
    const countryQuery = req.body.country
    const provinceQuery = req.body.province
    const cityQuery = req.body.city
    const ratingQuery = parseInt(req.body.rating)
    const startPriceQuery = parseInt(req.body.startPrice) || 0
    const endPriceQuery = parseInt(req.body.endPrice) || 999999
    const sortQuery = parseInt(req.body.sort) || 1
    //const firstDateQuery = new Date(req.query.firstDate)
    //const lastDateQuery = new Date(req.query.lastDate)

    //Create Match Query Map
    const dynamicQueryObj = {}
    if (nameQuery && nameQuery != '') { dynamicQueryObj['name'] = { $regex: nameQuery, $options: 'i' } }
    if (countryQuery && countryQuery != '') { dynamicQueryObj['location.country'] = { $regex: countryQuery, $options: 'i' } }
    if (cityQuery && cityQuery != '') { dynamicQueryObj['location.city'] = { $regex: cityQuery, $options: 'i' } }
    if (provinceQuery && provinceQuery != '') { dynamicQueryObj['location.province'] = { $regex: provinceQuery, $options: 'i' } }
    if (ratingQuery && ratingQuery != null) { dynamicQueryObj['ratings'] = { $gte: ratingQuery } }
    if (startPriceQuery && startPriceQuery != null || endPriceQuery && endPriceQuery != null) { dynamicQueryObj['rooms.price'] = { $gte: startPriceQuery, $lte: endPriceQuery } }

    //let priceProjRule = {rooms:{$elemMatch:{price: {$lte: endPriceQuery, $gte: startPriceQuery}}}}

    let sortRule = {}
    //Sorting Rules
    /**
     * ID 1 = Price Sort Descending
     * ID 2 = Price Sort Ascending
     * ID 3 = Rating sort Descending
     * ID 4 = Rating sort Ascending
     */
    if (sortQuery == 1) { sortRule = { 'rooms.price': 1 } }
    else if (sortQuery == 2) { sortRule = { 'rooms.price': -1 } }
    else if (sortQuery == 3) { sortRule = { 'ratings': 1 } }
    else if (sortQuery == 4) { sortRule = { 'ratings': -1 } }
    //if (firstDateQuery && firstDateQuery != 'Invalid Date'){dynamicQueryObj['rooms.datesBooked.firstDate'] =  {$not: {$gte: firstDateQuery}}}
    //if (lastDateQuery && lastDateQuery != 'Invalid Date'){dynamicQueryObj['rooms.datesBooked.lastDate'] =  lastDateQuery}

    console.log(dynamicQueryObj)
    console.log(sortRule)

    //SELECT * location.city, location.province, location.country, ratings, rooms.price
    const hotels = await Hotel.aggregate([
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
                $and: [{ $gte: ["$$room.price", startPriceQuery] },
                { $lte: ["$$room.price", endPriceQuery] }]
              }
            }
          }
        },
      },
      {
        $unwind: "$rooms"
      },
      {
        $match: dynamicQueryObj
      },
      {
        '$sort': sortRule,
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          description: { $first: "$description" },
          imgsrc: { $first: "$imgsrc" },
          ratings: { $first: "$ratings" },
          reviews: { $first: "$reviews" },
          location: { $first: "$location" },
          rooms: { $push: "$rooms" }
        }
      },
    ])
      .sort(sortRule)
      .skip(page * limit)
      .limit(limit)

    res.status(200).json(hotels)
  } catch (err) {
    console.log(err)
  }
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

// get available room
const getAvailableRooms = async (req, res) => {

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

  const hotel = await Hotel.find(
    { _id: id, rooms: { $elemMatch: { _id: roomid } } }, { name: 1, location: 1, "rooms.$": 1 }
  )

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

  const firstDate = new Date(req.body.firstDate)
  const lastDate = new Date(req.body.lastDate)
  console.log(firstDate)
  console.log(lastDate)
  if (lastDate.valueOf() <= firstDate.valueOf()) {
    return res.status(400).json({ error: 'Last date is before first date.' })
  }
  if (firstDate.valueOf <= new Date().valueOf()) {
    return res.status(400).json({ error: 'Invalid start date.' })
  }
  const dataCheck = await Hotel.find({
    _id: id,
    'rooms._id': roomid,
    'rooms.datesBooked.firstDate': { $lte: lastDate },
    'rooms.datesBooked.lastDate': { $gte: firstDate }

  })
  console.log(dataCheck)
  if (dataCheck.length != 0) {
    return res.status(400).json({ error: 'Date conflicts with a booked room.' })
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such hotel' })
  }


  var authorization = req.headers.authorization.split(" ")[1]
  const [, auth,] = authorization.split(".")
  var userId = atob(auth)
  userId = userId.substring(8, 32);
  var body = req.body;
  body.userId = userId;
  console.log("VALID. ADDING TO DB")
  const hotel = await Hotel.findOneAndUpdate({ _id: id }, {
    $push: {
      "rooms.$[i].datesBooked": body
    }
  },
    {
      arrayFilters: [
        { "i._id": roomid }
      ]
    }
  )


  if (!hotel) {
    return res.status(400).json({ error: 'No such hotel' })
  }

  //const hotel = await Hotel.find({_id: id, 'rooms._id': roomid}, { "rooms.datesBooked.firstDate": 1, "rooms.datesBooked.lastDate": 1})

  res.status(200).json(hotel)
}

const addDateToUser = async (req, res) => {
  let id = "64478e4a70afb823ebb4fb94";
  const user = await User.updateOne({ _id: id }, {
    $push: {
      "datesBooked": req.body
    }
  }
  )

  res.status(200).json("Updated User")
}

const addReview = async (req, res) => {
  var authorization = req.headers.authorization.split(' ')[1]
  const [, auth,] = authorization.split(".")
  var userIds = atob(auth);
  userIds = userIds.substring(8, 32);
  var body = req.body;
  const id = body.hotelId;
  body.userId = userIds;
  const id2 = body.userId;

  const userReview = await Hotel.findById({ _id: id }).find({ 'reviews': { $elemMatch: { userId: userIds } } });
  if (JSON.stringify(userReview).includes("review")) {
    res.status(409).json("REVIEW ALREADY EXISTS");
  }
  else {
    const hotel = await Hotel.findByIdAndUpdate({ _id: id }, {
      $push: {
        "reviews": body
      }
    })
    const user = await User.updateOne({_id: id2},{
      $push:{
        "reviews":body
      }
    })
    res.status(200).json("success");
  }
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
  createHotel,
  deleteHotel,
  updateHotel,
  getRoom,
  bookHotel,
  addReview,
  addDateToUser,
  getAvailableRooms,
  addRating
}