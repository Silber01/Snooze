const mongoose = require('mongoose');

console.log('hello world');
// Define the schema for the Hotel model
const hotelSchema = new mongoose.Schema({
  name: String,
  description: String,
  imgsrc: String,
  rooms: [{
    price: Number,
    roomType: String,
    roomNum: Number,
    beds: Number,
    hasWifi: Boolean,
    imgsrc: String,
    datesBooked: [{
      firstDate: String,
      lastDate: String
    }]
  }],
  ratings: {
    1: Number,
    2: Number,
    3: Number,
    4: Number,
    5: Number
  },
  reviews: [{
    user: String,
    review: String,
    rating: Number
  }],
  location: {
    address: String,
    city: String,
    province: String,
    country: String
  }
});

// Define the Hotel model
const Hotel = mongoose.model('Hotel', hotelSchema);

async function run() {
  const hotel = await Hotel.create({
    name: "Imperial Star Hotel",
    description: "Empire's Hotel.",
    imgsrc: "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png",
    rooms: [{
        price: Math.floor(Math.random() * 10000),
        roomType: "Suite",
        roomNum: Math.floor(Math.random() * 999),
        beds: Math.floor(Math.random() * 5),
        hasWifi: true,
        imgsrc: "image",
        datesBooked: [{
            firstDate: "2023-04-07",
            lastDate: "2023-04-10"
          },
          {
            firstDate: "2023-04-13",
            lastDate: "2023-04-17"
          },
        ]
      },
      {
        price: Math.floor(Math.random() * 10000),
        roomType: "Suite",
        roomNum: Math.floor(Math.random() * 999),
        beds: Math.floor(Math.random() * 5 + 1),
        hasWifi: true,
        imgsrc: "image",
        datesBooked: [{
            firstDate: "2023-04-07",
            lastDate: "2023-04-10"
          },
          {
            firstDate: "2023-04-13",
            lastDate: "2023-04-17"
          },
        ]
      },
    ],
    ratings: {
      1: Math.floor(Math.random() * 1000),
      2: Math.floor(Math.random() * 1000),
      3: Math.floor(Math.random() * 1000),
      4: Math.floor(Math.random() * 1000),
      5: Math.floor(Math.random() * 1000)
    },
    reviews: [{
        user: "test user",
        review: "abc",
        rating: 4
      },
      {
        user: "test user",
        review: "abc",
        rating: 4
      },
      {
        user: "test user",
        review: "abc",
        rating: 4
      }
    ],
    location: {
      address: "test",
      city: "Milpitas",
      province: "California",
      country: "United States"
    },
})
await hotel.save()
console.log(hotel)
}