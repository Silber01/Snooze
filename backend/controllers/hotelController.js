const Hotel = require("../models/hotelModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

const gen = require("./script.js");

// get all hotels
const getAllHotels = async (req, res) => {
  const hotels = await Hotel.find({}).sort({ createdAt: -1 });

  res.status(200).json(hotels);
};

/**
 * Searches by location and filters by minRating and price Interval.
 *
 * @param location
 * @param minRating
 * @param minPrice
 * @param maxPrice
 * @param sort
 */
const getHotels = async (req, res) => {
  try {
    const location = req.query.location || "";
    const minRating = parseInt(req.query.minRating) || 0;
    const minPrice = parseInt(req.query.minPrice) || 0;
    const maxPrice = parseInt(req.query.maxPrice) || 99999;
    const sort = parseInt(req.query.sort) || 0;
    const rule = parseInt(req.query.sort) || 1;

    const matchObj = {};
    if (location.length > 0 || location != "") {
      matchObj["$search"] = {
        index: "hotelSearch",
        text: {
          query: location,
          path: {
            wildcard: "*",
          },
        },
      };
    } else {
      matchObj["$sort"] = { createdAt: -1 };
    }

    const sortObj = {};
    if (sort == 0 && (location.length == 0 || location == "")) {
      sortObj["$sort"] = { createdAt: -1 };
    } else if (sort == 0) {
      sortObj["$sort"] = { score: { $meta: "textScore" } };
    } else if (sort == 1) {
      sortObj["$sort"] = { name: 1 };
    } else if (sort == 2) {
      sortObj["$sort"] = { name: -1 };
    } else if (sort == 3) {
      sortObj["$sort"] = { "rooms.price": 1 };
    } else if (sort == 4) {
      sortObj["$sort"] = { "rooms.0.price": -1 };
    } else if (sort == 5) {
      sortObj["$sort"] = { ratingcalc: 1 };
    } else if (sort == 6) {
      sortObj["$sort"] = { ratingcalc: -1 };
    }

    console.log(matchObj);
    console.log(sortObj);
    const hotel = await Hotel.aggregate([
      matchObj,
      {
        $project: {
          name: 1,
          description: 1,
          imgsrc: 1,
          ratings: 1,
          ratingcalc: {
            $divide: [
              {
                $sum: [
                  { $multiply: ["$ratings.1", 1] },
                  { $multiply: ["$ratings.2", 2] },
                  { $multiply: ["$ratings.3", 3] },
                  { $multiply: ["$ratings.4", 4] },
                  { $multiply: ["$ratings.5", 5] },
                ],
              },
              {
                $sum: [
                  "$ratings.1",
                  "$ratings.2",
                  "$ratings.3",
                  "$ratings.4",
                  "$ratings.5",
                ],
              },
            ],
          },

          reviews: 1,
          location: 1,
          rooms: {
            $filter: {
              input: "$rooms",
              as: "room",
              cond: {
                $and: [
                  { $gte: ["$$room.price", minPrice] },
                  { $lte: ["$$room.price", maxPrice] },
                ],
              },
            },
          },
          score: { $meta: "searchScore" },
        },
      },
      {
        $match: {
          ratingcalc: { $gte: minRating },
          "rooms.price": { $gte: minPrice },
          "rooms.price": { $lte: maxPrice },
        },
      },
      {$unwind:"$rooms"},
      {"$sort":{ "rooms.price": 1 }},
      {
        $group: {
          ratingcalc:{ $first: "$ratingcalc"},
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
      sortObj,
      {
        $project: {ratingcalc: 0}
      }
      
    ]);
    res.status(200).json(hotel);
  } catch (err) {
    console.log(err);
  }
};

/**
 * Get a single hotel
 * @param  hotelID
 */
const getHotel = async (req, res) => {
  try {
    const hotelID = req.query.hotelID;

    if (!mongoose.Types.ObjectId.isValid(hotelID)) {
      return res.status(404).json({ error: "No such hotel" });
    }

    const hotel = await Hotel.findById(hotelID);

    if (!hotel) {
      return res.status(404).json({ error: "No such hotel" });
    }

    res.status(200).json(hotel);
  } catch (err) {
    console.log(err);
  }
};

// get available room
const getAvailableRooms = async (req, res) => {};

/**
 * get a single hotel room
 * @param roomID
 */
const getRoom = async (req, res) => {
  try {
    const roomID = req.query.roomID;
    const hotelID = req.query.hotelID;

    if (!mongoose.Types.ObjectId.isValid(roomID)) {
      return res.status(404).json({ error: "No such room" });
    }
    console.log("valid args");
    console.log(roomID);

    const hotel = await Hotel.find(
      { _id: hotelID, rooms: { $elemMatch: { _id: roomID } } },
      {
        "rooms.$": 1,
      }
    );

    res.status(200).json(hotel);
  } catch (err) {
    console.log(err);
  }
};

/**
 * Book a Hotel Room.
 *
 * @param tokenHeader
 * @param hotelID
 * @param roomID
 * @param firstDate
 * @param lastDate
 */
const bookHotel = async (req, res) => {
  try {
    const { hotelID } = req.body;
    const { roomID } = req.body;
    const firstDate = new Date(req.body.firstDate);
    const lastDate = new Date(req.body.lastDate);

    var authorization = req.headers.authorization.split(" ")[1];
    const [, auth] = authorization.split(".");
    var userId = atob(auth);
    userId = userId.substring(8, 32);
    var body = req.body;
    body.userId = userId;

    /**booking conflict */
    if (!mongoose.Types.ObjectId.isValid(hotelID)) {
      return res.status(404).json({ error: "No such hotel" });
    }
    if (lastDate == "Invalid Date" || firstDate == "Invalid Date") {
      return res.status(400).json({ error: "Invalid First or Last Date." });
    }
    if (lastDate.valueOf() < firstDate.valueOf()) {
      return res.status(400).json({ error: "Last date is before." });
    }
    if (firstDate.valueOf() <= new Date().valueOf()) {
      return res.status(400).json({ error: "First Date is before today." });
    }
    if (lastDate.valueOf() <= new Date().valueOf()) {
      return res.status(400).json({ error: "Last Date is before today." });
    }

    var valid = true;
    const dataCheck = await Hotel.find(
      {
        _id: hotelID,
        "rooms._id": roomID,
      },
      {
        "rooms.datesBooked.$": 1,
      }
    );

    const array = dataCheck[0].rooms[0].datesBooked;
    for (let i = 0; i < array.length; i++) {
      /*
      if(array[i].userId == userId){
        return res
      .status(400)
      .json({ error: "You already booked this room." });
      }
      */
      if (lastDate >= array[i].firstDate && firstDate <= array[i].lastDate) {
        valid = false;
        break;
      }
    }

    if (!valid) {
      return res
        .status(400)
        .json({ error: "Date conflicts with a booked room." });
    }

    console.log("VALID. ADDING TO DB");
    const hotel = await Hotel.findOneAndUpdate(
      { _id: hotelID, "rooms._id": roomID },
      {
        $push: {
          "rooms.$[i].datesBooked": body,
        },
      },
      {
        arrayFilters: [{ "i._id": roomID }],
      }
    );

    if (!hotel) {
      return res.status(400).json({ error: "Failed to update hotel" });
    }

    body = req.body;
    body.hotelID = hotelID;
    body.roomID = roomID;
    const findPrice = await Hotel.findOne(
      { _id: hotelID, rooms: { $elemMatch: { _id: roomID } } },
      { "rooms.$": 1 }
    );
    body.price = findPrice.rooms[0].price;
    body._id = new mongoose.Types.ObjectId();

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ error: "Error finding user." });
    }

    //Adds to user db.
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          bookings: body,
        },
      }
    );

    res.status(200).json("update sucessful");
  } catch (err) {
    console.log(err);
  }
};

const checkHotel = async (req, res) => {
  try {
    const { hotelID } = req.query;
    const { roomID } = req.query;
    const firstDate = new Date(req.query.firstDate);
    const lastDate = new Date(req.query.lastDate);

    if (!mongoose.Types.ObjectId.isValid(hotelID)) {
      return res.status(404).json({ error: "No such hotel" });
    }
    if (lastDate == "Invalid Date" || firstDate == "Invalid Date") {
      return res.status(400).json({ error: "Invalid First or Last Date." });
    }
    if (lastDate.valueOf() < firstDate.valueOf()) {
      return res.status(400).json({ error: "Last date is before." });
    }
    if (firstDate.valueOf() <= new Date().valueOf()) {
      return res.status(400).json({ error: "First Date is before today." });
    }
    if (lastDate.valueOf() <= new Date().valueOf()) {
      return res.status(400).json({ error: "Last Date is before today." });
    }

    var valid = true;
    const dataCheck = await Hotel.find(
      {
        _id: hotelID,
        "rooms._id": roomID,
      },
      {
        "rooms.datesBooked.$": 1,
      }
    );

    const array = dataCheck[0].rooms[0].datesBooked;
    for (let i = 0; i < array.length; i++) {
      if (lastDate >= array[i].firstDate && firstDate <= array[i].lastDate) {
        valid = false;
        break;
      }
    }

    res.status(200).json({ valid });
  } catch (err) {
    console.log(err);
  }
};

/**
 * Adds a review
 * @param tokenHeader
 * @param hotelID
 */
const addReview = async (req, res) => {
  var authorization = req.headers.authorization.split(" ")[1];
  const [, auth] = authorization.split(".");
  var userIds = atob(auth);
  userIds = userIds.substring(8, 32);
  var body = req.body;
  const id = body.hotelID;
  delete body.hotelID;
  body.userId = userIds;

  const userReview = await Hotel.findById({ _id: id }).find({
    reviews: { $elemMatch: { userId: userIds } },
  });
  console.log(JSON.stringify(userReview).includes("review"));
  if (JSON.stringify(userReview).includes("review")) {
    res.status(409).json("REVIEW ALREADY EXISTS");
  } else {
    const hotel = await Hotel.findByIdAndUpdate(
      { _id: id },
      {
        $push: {
          reviews: body,
        },
      }
    );
  }
  res.status(200).json(userReview);
};

const addRating = async (req, res) => {
  var authorization = req.headers.authorization.split(" ")[1];
  const [, auth] = authorization.split(".");
  var userId = atob(auth);
  userId = userId.substring(8, 32);
  var body = req.body;
  const id = body.hotelID;
  delete body.hotelID;
  body.userId = userId;

  const hotel = await Hotel.findByIdAndUpdate(
    { _id: id },
    {
      $inc: {
        [`ratings.${body.rating}`]: 1,
      },
    }
  );
  res.status(200).json(hotel);
};

/**
 * Route to generate hotels.
 */
const generateHotel = async (req, res) => {
  const hotel = gen.run();
  res.status(200).json(hotel);
};

module.exports = {
  getAllHotels,
  getHotels,
  getHotel,
  getRoom,
  bookHotel,
  addReview,
  getAvailableRooms,
  addRating,
  generateHotel,
  checkHotel,
};
