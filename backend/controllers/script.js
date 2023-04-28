
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateName() {
    var hotelName = ["King's", "Sunset", "Marina", "Jade", "Northern", "Golden", "Mellow", "Silver", "Santa", "Peaceful", "Serene", "Bronze", "Sapphire", "Onyx", "Azure", "Muse", "Leisure", "Utopia", "Drizzle", "Seaside", "Market", "Loch", "Flower", "Cosmos", "Petal", "Sunset", "Pacific", "Snowy", "Exhalted", "Angel", "Maple"]
    var hotelName2 = ["Springs", "Heights", "View", "Haven", "Tower", "Keep", "Point", "Peaks", "Lake", "Temple", "Square", "Blues", "Dome", "Willow", "Manor", "Ridge", "Majesty", "Court", "Park"]
    var peopleName = ["Hilton", "Marriot", "Claridge's", "Omni Severin", "Taj", "Stanley", "Maria"]
    var hotelType = ["Hotel", "Motel", "Resort", "Resort & Spa", "Inn", "Suites", "Bed and Breakfast", "Hostel"]

    let x = getRandomInt(0, 100)
    var name = ""

    if (x % 3 == 0){
        name = hotelName[getRandomInt(0, hotelName.length)] + ' ' + hotelName2[getRandomInt(0, hotelName2.length)] + ' ' + hotelType[getRandomInt(0, hotelType.length)];
    } else if (x % 7 == 0){
        name = peopleName[getRandomInt(0, peopleName.length)] + ' ' + hotelType[getRandomInt(0, hotelType.length)]
    } else {
        name = hotelName[getRandomInt(0, hotelName.length)] + ' ' + hotelType[getRandomInt(0, hotelType.length)];
    }

    return name;

}

function generateDescription() {
    var hotelName = ["Peaceful", "Serene", "Bronze", "Sapphire", "Onyx", "Azure", "Muse", "Leisure", "Utopia", "Drizzle", "Seaside", "Market", "Loch", "Flower", "Cosmos", "Petal", "Sunset", "Pacific", "Snowy", "Exhalted", "Angel", "Maple"]
    var hotelName2 = ["Springs", "Heights", "View", "Haven", "Tower", "Keep", "Point", "Peaks", "Lake", "Temple", "Square", "Blues", "Dome"]
    var peopleName = ["Hilton", "Marriot", "Claridge's", "Omni Severin", "Taj", "Stanley", "Maria"]
    var hotelType = ["Hotel", "Motel", "Resort", "Resort & Spa", "Inn", "Suites", "Bed and Breakfast", "Hostel"]

    let x = getRandomInt(0, 100)
    var name = ""

    if (x % 5 == 0){
        name = hotelName[getRandomInt(0, hotelName.length)] + ' ' + hotelName2[getRandomInt(0, hotelName2.length)] + ' ' + hotelType[getRandomInt(0, hotelType.length)];
    } else if (x % 7 == 0){
        name = peopleName[getRandomInt(0, peopleName.length)] + ' ' + hotelType[getRandomInt(0, hotelType.length)]
    } else {
        name = hotelName[getRandomInt(0, hotelName.length)] + ' ' + hotelType[getRandomInt(0, hotelType.length)];
    }

    return name;

}

async function run() {
    const hotel = await Hotel.create({
        name: generateName(),
        description: "Fancy Blue Hotel.",
        imgsrc: "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png",
        rooms: [

            {
                price: getRandomInt(100, 700),
                roomType: "Suite",
                roomNum: Math.floor(Math.random() * 999),
                beds: Math.floor(Math.random() * 5),
                hasWifi: true,
                imgsrc: "image",
                datesBooked: [
                    { firstDate: "2023-04-07", lastDate: "2023-04-10" },
                    { firstDate: "2023-04-13", lastDate: "2023-04-17" },
                ]
            },

            {
                price: Math.floor(Math.random() * 10000),
                roomType: "Suite",
                roomNum: Math.floor(Math.random() * 999),
                beds: Math.floor(Math.random() * 5 + 1),
                hasWifi: true,
                imgsrc: "image",
                datesBooked: [
                    { firstDate: "2023-04-07", lastDate: "2023-04-10" },
                    { firstDate: "2023-04-13", lastDate: "2023-04-17" },
                ]
            },
        ],
        ratings: { 1: Math.floor(Math.random() * 1000), 2: Math.floor(Math.random() * 1000), 3: Math.floor(Math.random() * 1000), 4: Math.floor(Math.random() * 1000), 5: Math.floor(Math.random() * 1000) },
        reviews: [
            { user: "test user", review: "abc", rating: 4 },
            { user: "test user", review: "abc", rating: 4 },
            { user: "test user", review: "abc", rating: 4 }
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

module.exports = { generateName, getRandomInt };
