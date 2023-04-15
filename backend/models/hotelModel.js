const mongoose = require('mongoose')

const Schema = mongoose.Schema

const hotelSchema = new Schema({
    id:{
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    ratings:{
        1: Number,
        2: Number,
        3: Number,
        4: Number,
        5: Number
    },
    reviews:[{
        id: Number,
    }],
    location: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        province: {
            type: String,
            required: false
        },
        country: {
            type: String,
            required: true
        },
    },
    rooms: [{
        id:Number,
        price: Number,
        beds: Number,
        hasWifi: Boolean,
        datesBooked:[{
            firstDate: String,
            lastDate: String
        }]
    }]
})

module.exports = mongoose.model('Hotel', hotelSchema)