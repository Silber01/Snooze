const mongoose = require('mongoose')

const Schema = mongoose.Schema

const hotelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    imgsrc:{
        type: String,
        required: true
    },
    ratings:{
        1:{type: Number},
        2:{type: Number},
        3:{type: Number},
        4:{type: Number},
        5:{type: Number}
    },
    reviews:[{
        user: String,
        review: String,
        rating: Number,
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
        datesBooked:[{
            firstDate:{
                type: Date,
            },
            lastDate: {
                type: Date,
            },
        }],
        price: {
            type:Number,
            required: true
        },
        roomType: {
            type:String,
            required: true
        },
        roomNum: {
            type:Number,
            required: true
        },
        beds: {
            type:Number,
            required: true
        },
        hasWifi: {
            type:Boolean,
            required: true
        },
        
        imgsrc: String,
    }],


})

module.exports = mongoose.model('Hotel', hotelSchema)
