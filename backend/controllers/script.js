const Hotel = require("../models/hotelModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

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
    var descriptions = ["Includes amenities, point of interest locations, and any unique features that set it apart from other lodging options.",
    "Experience comfort and luxury like never before at our hotel. Our premium amenities and unmatched concierge service ensure a memorable stay for all our guests. Book your stay today and indulge in the ultimate hotel experience.",
    "Looking for a comfortable and luxurious hotel experience? Our hotel offers top-notch amenities, exceptional service, and a prime location for both business and leisure travelers. Discover the perfect place to stay for your next trip.",
    "Looking for the perfect hotel for your next vacation or business trip? Look no further! This page has comprehensive descriptions of a variety of hotels, including amenities, location, and pricing information.",
    "Looking for a place to stay during your travels? Check out our hotel and experience comfort and luxury like never before. Discover our amenities, services and book your stay now.",
    "Discover what makes this hotel a great choice for your travel needs.",
    "Discover all that this hotel has to offer to make your stay comfortable and enjoyable.",
    "Experience luxurious comfort and exceptional service at our hotel. From spacious rooms and suites to fine dining and relaxing amenities, we are dedicated to making your stay unforgettable. Book your stay today and discover a world of elegance and convenience.",
    "Looking for the perfect hotel? Check out our comprehensive descriptions of the top hotels in various locations around the world. From budget-friendly accommodations to luxury resorts, find the perfect place to stay for your next travel adventure.",
    "Looking for a place to stay? Our hotel offers comfortable rooms, convenient amenities, and excellent service. Read our description for more information.",
    "Looking for the perfect hotel for your next getaway? Our comprehensive hotel descriptions give you all the information you need to make an informed decision about where to stay, including amenities, location, and customer reviews.",
    "Looking for the perfect hotel to stay in during your travels? Discover our top recommendations for hotels with comfortable accommodations, excellent amenities, and exceptional service. Read on for detailed descriptions of each recommended hotel",
    "Discover our luxurious hotel and experience comfort, style, and world-class amenities that enhance your stay. From beautifully appointed rooms to exquisite dining options, our hotel promises an unforgettable experience. Book your stay now!",
    "Looking for the perfect hotel? Get a detailed description of the best hotels in your desired location - from luxurious resorts to budget-friendly options - and book your stay today.",
    "Looking for a comfortable place to stay during your travels? Check out our hotel's website to learn more about our amenities, services, and rooms. We offer a relaxing and welcoming environment for all guests.",
    "Looking for the perfect hotel for your upcoming vacation or business trip? Find a comprehensive description of hotels, including amenities, services, nearby attractions, and more. Book your stay now!",
    "Looking for an ideal place to stay during your travels? Discover our hotel's cozy, comfortable rooms and exceptional amenities that will make your stay a relaxing and enjoyable experience.",
    "Looking for a comfortable and luxurious stay? Our hotel provides top-notch amenities and personalized services to make your stay memorable. From spacious rooms to fine dining, we offer everything you need for a perfect stay. Book now and experience true hospitality.",
    "Looking for a hotel that meets all your needs? Browse through our list of hotels with detailed descriptions to find the perfect fit for your next vacation or business trip.",
    "Discover what makes our hotel a top choice for travelers. Whether you're looking for a luxurious getaway, a business trip, or a comfortable stay for your family vacation, our hotel offers a perfect balance of amenities and location to suit your needs.",
    "Discover the perfect retreat at our luxury hotel, where contemporary style and warm hospitality come together to create an unforgettable experience. From stylish accommodations to exceptional dining and world-class amenities, every detail has been thoughtfully designed to ensure your comfort and convenience. Let us take care of you on your next adventure.",
    "Looking for a comfortable and relaxing stay? Our hotel offers modern amenities and outstanding service to make your stay enjoyable. Learn more about our rooms, on-site dining options, and convenient location. Book today!",
    "Discover the perfect hotel for your next trip. Our hotel description will give you an idea of our amenities and services, as well as the nearby attractions and activities. Book your room now!",
    "Discover a world of luxury and comfort at our hotel. With stunning views, exceptional amenities, and personalized service, our hotel provides an unforgettable experience for every guest. Book your stay today and indulge in the ultimate relaxation.",
    "Discover the perfect blend of modern amenities with elegant accommodations at our luxury hotel. With comfortable rooms, sophisticated dining, and prime meeting facilities, our hotel provides the ideal starting point for exploring the area or conducting business. Book your stay at our hotel today.",
    "Looking for the perfect hotel for your next vacation or business trip? Get a detailed description of the best hotels in your desired location, including amenities, room types, and rates. Plan your stay today!",
    "Looking for the perfect hotel? Read our detailed descriptions of top hotels from around the world, including amenities, location, and nearby attractions, to find the perfect fit for your next vacation or business trip.",
    "Looking for a comfortable and luxurious stay? Our hotel provides the perfect blend of comfort and style, making your trip an unforgettable experience. Discover our amenities and book your stay today."]


    var desc = descriptions[getRandomInt(0, descriptions.length)]

    return desc;

}

/*
function randomDate(startDate, endDate) {
    let dateObj = {}
    const timeDiff = endDate.getTime() - startDate.getTime();
    let randomTime = Math.random() * timeDiff;
    const randomFirstDate = new Date(startDate.getTime() + randomTime);
    randomTime = Math.random() * timeDiff;
    const randomLastDate = new Date(randomFirstDate.getTime() + randomTime);
    dateObj.firstDate = randomFirstDate;
    dateObj.lastDate = randomLastDate;
    return dateObj;
    
}

function generateDatesBooked(){
    var datesBooked = []
 

    let intervalStart = new Date("2023-04-01")
    let intervalEnd = new Date("2023-06-01")
    for (let i = 0; i < 20; i++){
        datesBooked.push(randomDate(intervalStart, intervalEnd))
    }
    return datesBooked
}
console.log(generateDatesBooked())

*/

function generateRoomType() {
    var roomType = ["Family Room", "Suite", "Villa", "Presidential Suite", "Executive Suite"]
    var type = roomType[getRandomInt(0, roomType.length)]
    return type
}

function generateRoom(){
    var room = 
    {
        price: getRandomInt(100, 700),
        roomType: generateRoomType(),
        roomNum: getRandomInt(100, 900),
        beds: getRandomInt(1, 5),
        hasWifi: true,
        imgsrc: "https://www.thespruce.com/thmb/2_Q52GK3rayV1wnqm6vyBvgI3Ew=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/put-together-a-perfect-guest-room-1976987-hero-223e3e8f697e4b13b62ad4fe898d492d.jpg",
        datesBooked: [
            { firstDate: "2023-04-07", lastDate: "2023-04-10" },
            { firstDate: "2023-04-13", lastDate: "2023-04-17" },
        ]
    }
    return room
}

function generateRoomList(){
    var rooms = []
    let roomObj = {}
    for (let i = 0; i < getRandomInt(1, 20); i++){
        roomObj = generateRoom()
        rooms.push(roomObj)
    }
    return rooms
}

function generateReviewText(number){
    var high = ["I had an amazing stay at this hotel! The room was spacious and clean, and the staff were incredibly friendly and accommodating. The hotel's location was perfect for exploring the city, and the amenities offered were top-notch. The breakfast buffet was delicious with a wide variety of options to choose from. Overall, I highly recommend this hotel to anyone looking for a comfortable and convenient stay.",
    "I had a fantastic stay at this hotel! The room was clean and comfortable, and the staff were all friendly and accommodating. The location was also great, with easy access to restaurants and shops. The amenities such as the pool and gym were a nice bonus. I would definitely recommend this hotel to anyone looking for a pleasant and convenient stay.",
    "I had a wonderful stay at this hotel. The rooms were clean and comfortable, and the staff were friendly and helpful. The location was also perfect for exploring the city, with many restaurants and attractions within walking distance. The breakfast offered a wide variety of options and was delicious. Overall, I highly recommend this hotel to anyone visiting the area.",
    
]
    var mid = ["Based on guest reviews, the hotel provides an average experience. While the rooms are clean and comfortable, some guests have noted issues with noise. The staff is generally friendly and helpful, although there have been a few complaints about slow service at the front desk. The hotel's location is convenient, with easy access to local attractions and dining options. However, some guests have mentioned that the hotel amenities, such as the fitness center and pool, could use some improvement. Overall, the hotel offers a decent stay for those looking for a basic accommodation option.",
    "Based on reviews from recent guests, the average experience at this hotel is generally positive. Guests have complimented the cleanliness of the rooms and common areas, as well as the amenities provided. The staff has also been praised for their friendly and helpful service. However, some guests have noted issues with noise levels and slow response times from staff. Overall, the hotel seems to be a comfortable and enjoyable stay for most guests.",
    "Overall, my stay at the hotel was quite enjoyable. The room was comfortable and clean, and the amenities provided were satisfactory. The staff was friendly and accommodating, making me feel welcome throughout my stay. However, there were a few minor issues with the Wi-Fi and noise level from adjacent rooms. Despite these issues, I would recommend this hotel to others looking for a convenient and comfortable stay."]

    var low = ["I had a terrible experience staying at this hotel. The room was dirty and smelled awful. The bed was uncomfortable and the linens were old and stained. The staff was unresponsive to my complaints and the overall atmosphere was depressing. I would not recommend this hotel to anyone and suggest looking for alternative accommodations. Save yourself the disappointment and avoid this place at all costs.",
    "My experience at this hotel was nothing short of disappointing. The room was small and cramped, with outdated décor and a musty smell. The bathroom was dirty and the shower water took forever to warm up. The staff was unfriendly and unhelpful, and the breakfast was subpar with stale bread and tasteless coffee. To make matters worse, the noise from the street outside kept me up all night. I would not recommend this hotel to anyone looking for a comfortable and enjoyable stay.",
    "I had a terrible experience at this hotel. The room was dirty and smelled musty. The bedding had stains on it and the towels were old and worn out. The air conditioning barely worked, making it uncomfortable to sleep. The walls were thin and I could hear every noise from the other rooms. The staff was unhelpful and unfriendly. Overall, I would not recommend staying at this hotel. It was a disappointing and unpleasant experience.",
    "Terrible experience. The room was dirty and smelling bad, which made it difficult to sleep. The furniture was outdated, stained and uncomfortable. The staff was unprofessional and indifferent to our complaints. The breakfast was cheap and the coffee tasted burnt. The location was noisy and felt unsafe, with lots of strange characters hanging around. We checked out as soon as we could and will never stay here again. Avoid this hotel at all costs.",
    "I had an extremely disappointing experience at this hotel. The room was dirty and smelled musty, and the bed was uncomfortable. The service was also terrible - staff were unhelpful and unfriendly. To top it off, the breakfast was completely inedible. I would definitely not recommend staying here.",]

    var pick 
    if (number >= 4){
        pick = high[getRandomInt(0, high.length)]
    } else if (number = 3){
        pick = mid[getRandomInt(0, mid.length)]
    } else {
        pick = low[getRandomInt(0, low.length)]
    }
    
    return pick
}
function generateReview(){
    let rating = getRandomInt(1, 5)
    var review = 
    {
        user: "12345678901232124123",
        review: generateReviewText(rating),
        roomNum: getRandomInt(100, 900),
        rating: rating
    }
    return review
}

function generateReviewList(){
    var reviews = []
    let reviewObj = {}
    for (let i = 0; i < getRandomInt(1, 20); i++){
        reviewObj = generateReview()
        reviews.push(reviewObj)
    }
    return reviews
}

function generateLocation(){
    var address = ["106 W 12th St", "2996 Sawayn Cliff", "51146 Antwon Mountain", "974 Aaliyah Place", "80127 Adela Common", "1582 Strother Street", "Riverside, Estaka, Bonifacio Street",
    "Mabini Hall, General Solano Street, Malacanang", "AV CUAUHTEMOC 195, PROGRESO, 39350", "IGNACIO PEREZ EDIFICIO ORBITA 28 SUR OFICINA 209, CENTRO, 76000", "64-3, Daeneung ri 2, Beobwon-eup", 
    "P.O Box 39873"]
    var city = ["Kansas City", "McClurefurt", "Sengerborough", "Virginiaberg", "Orphaport", "Birmingham", "Dipolog", "Manila", "Guerrero", "Queretaro", "Paju-si", "Dubai"]
    var province = ["Missorui", "Ohio", "Oklahoma", "California", "Kentucky", "Alabama", "Zamboanga del Norte", "Metro Manila", "Acapulco", "Querétaro", "Gyeonggi-do", "Dubai"]
    var country = ["United States", "United States", "United States", "United States", "United States", "United States", "Philippines", "Philippines", "México", "México", "Korea", 
    "Emirates"]

    var locationObj = {}
    
    let randomIndex = getRandomInt(0, address.length)

    locationObj.address = address[randomIndex]
    locationObj.city = city[randomIndex]
    locationObj.province = province[randomIndex]
    locationObj.country = country[randomIndex]
    
    return locationObj
}

async function run() {
    const hotel = await Hotel.create({
        name: generateName(),
        description: generateDescription(),
        imgsrc: "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png",
        rooms: generateRoomList(),
        ratings: { 1: getRandomInt(0, 1000), 2: getRandomInt(0, 1000), 3: getRandomInt(0, 1000), 4: getRandomInt(0, 1000), 5: getRandomInt(0, 1000) },
        reviews: generateReviewList(),
        location: generateLocation(),
    })
    await hotel.save()
    console.log(hotel)
}

module.exports = { run };
