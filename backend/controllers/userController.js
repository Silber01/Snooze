const User = require("../models/userModel");
const Hotel = require("../models/hotelModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const e = require("express");
const validator = require("validator");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const user = await User.signup(email, password, firstName, lastName);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a users data
const getUser = async (req, res) => {
  const email = req.params;
  try {
    const user = await User.findOne(email);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
    throw Error("No Email");
  }
};

/**
 * Set profile.
 *
 * @param tokenHeader
 * @param imgsrc
 * @param email
 * @param firstName
 * @param lastName
 * @param password
 */
const setProfile = async (req, res) => {
  try {
    var authorization = req.headers.authorization.split(" ")[1];
    const [, auth] = authorization.split(".");
    var userId = atob(auth);
    userId = userId.substring(8, 32);

    const { imgsrc, email, firstName, lastName, password } = req.body;
    console.log(req.body);
    if (password) {
      if (!validator.isStrongPassword(password)) {
        res.status(400).json("Not strong enough password.");
      } else {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
      }
    }

    const user = await User.findOneAndUpdate({ _id: userId }, req.body);
    res.status(200).json("update sucessful");
  } catch (err) {
    console.log(err);
  }
};

/**
 * Gets Bookings from User.
 *
 * @param tokenHeader
 */
const getBookings = async (req, res) => {
  try {
    var authorization = req.headers.authorization.split(" ")[1];
    const [, auth] = authorization.split(".");
    var userId = atob(auth);
    userId = userId.substring(8, 32);

    const user = await User.find({ _id: userId }, { bookings: 1 });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Cancel booking from user.
 *
 * @param tokenHeader
 * @param userBookingID
 */
const cancelBooking = async (req, res) => {
  try {
    var authorization = req.headers.authorization.split(" ")[1];
    const [, auth] = authorization.split(".");
    var userId = atob(auth);
    userId = userId.substring(8, 32);

    const { userBookingID } = req.body;

    if (!mongoose.isValidObjectId(userBookingID)) {
      res.status(400).json("Invalid user booking id.");
    }
    const user = await User.find(
      { _id: userId, "bookings": { $elemMatch: { _id: userBookingID } } },
      {
        "bookings.$": 1
      },
    );

    const userUpdate = await User.updateOne(
      { _id: userId, "bookings": { $elemMatch: { _id: userBookingID } } },
      {
        $pull: {
          'bookings': { "_id": userBookingID }
        }
      },
    )

    let arr = user?.[0].bookings?.[0]

    if (!user) {
      res.status(400).json("userBookingID not found.");
    } else {
      const hotelID = arr.hotelID;
      const roomID = arr.roomID;
      const firstDate = arr.firstDate;
      const lastDate = arr.lastDate;
      console.log(firstDate)
      const hotel = await Hotel.updateOne(
        { _id: hotelID, "rooms._id": roomID },
        {
          $pull: {
            "rooms.$[].datesBooked": {
              //$and: [{ firstDate: firstDate }, { lastDate: lastDate }],
              firstDate: firstDate
            },
          },
        }
      );
      res.status(200).json("Sucessful removal");
    }
  } catch (err) {
    console.log(err);
  }
};

/**
 * Changes a booking time.
 *
 * @param tokenHeader
 * @param userBookingID
 * @param firstDate
 * @param lastDate
 */
const changeBooking = async (req, res) => {
  try {
    var authorization = req.headers.authorization.split(" ")[1];
    const [, auth] = authorization.split(".");
    var userId = atob(auth);
    userId = userId.substring(8, 32);

    let { userBookingID, firstDate, lastDate } = req.body;

    firstDate = new Date(firstDate)
    lastDate = new Date(lastDate)

    if (firstDate == "Invalid Date" || lastDate == "Invalid Date") {
      throw { status: 400, message: "Invalid date supplied" };
    }
    if (lastDate.valueOf() <= firstDate.valueOf()) {
      return res
        .status(400)
        .json({ error: "Last date is before or during first date." });
    }
    if (firstDate.valueOf() <= new Date().valueOf()) {
      console.log(firstDate.valueOf)
      console.log(new Date().valueOf())
      return res.status(400).json({ error: "First Date is before today." });
    }
    if (lastDate.valueOf() <= new Date().valueOf()) {
      return res.status(400).json({ error: "Last Date is before today." });
    }

    let hotelID, roomID, oldFirstDate, oldLastDate;
    if (!mongoose.isValidObjectId(userBookingID)) {
      throw { status: 400, message: "Invalid ObjectID" };
    }

    const userFind = await User.findOne(
      { _id: userId, "bookings": { $elemMatch: { _id: userBookingID } } },
      {
        "bookings.$": 1
      },
    );

    if (!userFind) {
      throw { status: 404, message: "userBookingID not Found" };
    } else {
      hotelID = userFind.bookings[0].hotelID;
      roomID = userFind.bookings[0].roomID;
      oldFirstDate = userFind.bookings[0].firstDate;
      oldLastDate = userFind.bookings[0].lastDate;

      /**booking conflict */
      if (!mongoose.Types.ObjectId.isValid(hotelID)) {
        return res.status(404).json({ error: "No such hotel" });
      }
      if (lastDate == "Invalid Date" || firstDate == "Invalid Date") {
        return res.status(400).json({ error: "Invalid First or Last Date." });
      }
      if (lastDate.valueOf() <= firstDate.valueOf()) {
        return res
          .status(400)
          .json({ error: "Last date is before or during first date." });
      }
      if (firstDate.valueOf <= new Date().valueOf()) {
        return res.status(400).json({ error: "First Date is before today." });
      }

      console.log(oldFirstDate)
      console.log(oldLastDate)
      console.log(firstDate)
      console.log(lastDate)
      var valid = true
      const dataCheck = await Hotel.find({
        _id: hotelID,
        "rooms._id": roomID
      },
        {
          "rooms.datesBooked.$": 1
        }
      );

      const array = dataCheck[0].rooms[0].datesBooked
      console.log(array)
      if (firstDate > oldFirstDate && firstDate < oldLastDate && lastDate < oldLastDate && lastDate > oldFirstDate ){
        valid = true
        console.log("inside")
      } else {
        for (let i = 0; i < array.length; i++) {
          if ( oldLastDate.valueOf() === array[i].lastDate.valueOf() && oldFirstDate.valueOf() === array[i].firstDate.valueOf()){
            console.log("skip")
          } else {
            if (firstDate < array[i].firstDate && lastDate < array[i].firstDate ||
              firstDate > array[i].lastDate && lastDate > array[i].lastDate)  {
               console.log("valid condition")
           } else {
             valid = false
             console.log("false condition")
             console.log(array[i])
           }
          }
        };
      }

      if (!valid) {
        return res
          .status(400)
          .json({ error: "Date conflicts with a booked room." });
      }
    }

    const user = await User.findOneAndUpdate(
      { _id: userId, "bookings._id": userBookingID },
      {
        $set: {
          "bookings.$.firstDate": firstDate,
          "bookings.$.lastDate": lastDate,
        },
      }
    );

    const hotel = await Hotel.updateOne(
      { _id: hotelID, "rooms._id": roomID },
      {
        $set: {
          "rooms.$[].datesBooked.$[xxx].firstDate": firstDate,
          "rooms.$[].datesBooked.$[yyy].lastDate": lastDate,
        },
      },
      {
        arrayFilters: [
          { "xxx.firstDate": oldFirstDate },
          { "yyy.lastDate": oldLastDate },
        ],
      }
    );
    res.status(200).json(hotel);
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};
//update points of a user
const updatePoints = async (req, res) => {
  var authorization = req.headers.authorization.split(" ")[1];
  const [, auth] = authorization.split(".");
  var userId = atob(auth);
  userId = userId.substring(8, 32);
  if (parseInt(JSON.stringify(req.body.rewardsPoints)) < 0) {
    res.status(400).json("Invalid rewards points");
  } else {
    const user = await User.findOneAndUpdate({ _id: userId }, req.body);
    res.status(200).json("sucess");
  }
};
module.exports = {
  signupUser,
  loginUser,
  getUser,
  editProfile: setProfile,
  updatePoints,
  getBookings,
  changeBooking,
  cancelBooking,
};
