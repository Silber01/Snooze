const mongoose = require('mongoose')

const Schema = mongoose.Schema

const hotelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: false
        },
        country: {
            type: String,
            required: true
        },
    },
    rooms: [{
        id: {type:String},
        roomType: {type:String}, 
        datesBooked: {type:String},
    }]

})

module.exports = mongoose.model('Hotel', hotelSchema)