const Hotel = require('../models/hotelModel')
const mongoose = require('mongoose')

// get all hotels
const getHotels = async (req, res) => {
  const hotels = await Hotel.find({}).sort({ createdAt: -1 })

  res.status(200).json(hotels)
}

/*
run()
async function run(){
  const hotel = await Hotel.create ({
    name: "Another Test Hotel 2",
    description: "Test Description",
    imgsrc: "image",
    rooms:[{price:40, roomType:"Suite",roomNum:200, beds: 2, hasWifi: true, imgsrc: "image", 
    datesBooked:[
      {firstDate:"2023-04-07",lastDate:"2023-04-10"},
      {firstDate:"2023-04-13",lastDate:"2023-04-17"},
    ]}],
    ratings:{1:4, 2:5, 3:4, 4:4, 5:5},
    reviews:[
      {user:"test user", review: "abc", rating:4},
      {user:"test user", review: "abc", rating:4},
      {user:"test user", review: "abc", rating:4}
    ],
    location:{
      address:"test",
      city:"san jose",
      province:"California",
      country:"United States"
    },
  })
  await hotel.save()
  console.log(hotel)
}
*/



// query hotels
// Currently logs the query map. Needs to be removed later.

/**
 * Handles hotel query from get request.
 *  
 * @param name
 * @param country
 * @param province
 * @param city
 * @param sort 
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
const queryHotels = async (req, res) => {
  try {

    //Define Page Limits and Query Params
    const page = parseInt(req.query.page) - 1 || 0
    const limit = parseInt(req.query.limit) || 3
    const nameQuery = req.query.name
    const countryQuery = req.query.country
    const provinceQuery = req.query.province
    const cityQuery = req.query.city
    const sortQuery = parseInt(req.query.sort)
    //const firstDateQuery = new Date(req.query.firstDate)
    //const lastDateQuery = new Date(req.query.lastDate)

    //Create Query Map
    const dynamicQueryObj = {}
    let sortRule = {}
    if (nameQuery){dynamicQueryObj['name'] = {$regex: nameQuery, $options: 'i'}}
    if (countryQuery){dynamicQueryObj['location.country'] =  {$regex: countryQuery, $options: 'i'}}
    if (cityQuery){dynamicQueryObj['location.city'] =  {$regex: cityQuery, $options: 'i'}}
    if (provinceQuery){dynamicQueryObj['location.province'] =  {$regex: provinceQuery, $options: 'i'}}
    //if (firstDateQuery && firstDateQuery != 'Invalid Date'){dynamicQueryObj['rooms.datesBooked.firstDate'] =  {$not: {$gte: firstDateQuery}}}
    //if (lastDateQuery && lastDateQuery != 'Invalid Date'){dynamicQueryObj['rooms.datesBooked.lastDate'] =  lastDateQuery}
    console.log(sortQuery)

    console.log(dynamicQueryObj)

    //Sorting Rules
    /**
     * ID 1 = Price Sort Descending
     * ID 2 = Price Sort Ascending
     * ID 3 = Rating sort Descending
     * ID 4 = Rating sort Ascending
     */
    if (sortQuery == 1){sortRule = {'rooms.price': 1}}
    else if (sortQuery == 2){sortRule = {'rooms.price': -1}}
    else if (sortQuery == 3){sortRule = {'ratings': 1}}
    else if (sortQuery == 4){sortRule = {'ratings': -1}}
    console.log(sortRule)

    /*    Ignore this
    const hotels = await Hotel.aggregate([
      {$match: dynamicQueryObj},
      {$sort: {
        'rooms.price': 1
      }}
    ])
    */

    //SELECT * location.city, location.province, location.country, ratings, rooms.price
    const hotels = await Hotel.find(dynamicQueryObj, 
      {name:1, 
        "location.city":1, 
        "location.province":1, 
        "location.country":1, 
        "ratings":1, 
        "rooms.price":1,
        "rooms.datesBooked":1
      })
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
    { _id: id, rooms: { $elemMatch: { _id: roomid } } },
    { "rooms.$": 1 }
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

  console.log("VALID. ADDING TO DB")
  const hotel = await Hotel.findOneAndUpdate({ _id: id }, {
    $push: {
      "rooms.$[i].datesBooked": req.body
    }
  },
    {
      arrayFilters: [
        { "i._id": roomid }
      ]
    }
  )

  //const hotel = await Hotel.find({_id: id, 'rooms._id': roomid}, { "rooms.datesBooked.firstDate": 1, "rooms.datesBooked.lastDate": 1})

  if (!hotel) {
    return res.status(400).json({ error: 'No such hotel' })
  }

  res.status(200).json(hotel)
}

const addReview = async(req, res) => 
{
  var authorization = req.headers.authorization.split(' ')[1]
  const[,auth,] = authorization.split(".")
  var userId = atob(auth);
  userId = userId.substring(8,32);
  const {id} = req.params;
  var body = req.body;
  body._id = userId;
  const hotel = await Hotel.findByIdAndUpdate({_id: id},{
    $push:{
      "reviews" : body
    }
  })

  res.status(200).json(hotel);

}


module.exports = {
  getHotel,
  getHotels,
  createHotel,
  deleteHotel,
  updateHotel,
  getRoom,
  bookHotel,
  addReview,
  queryHotels
}