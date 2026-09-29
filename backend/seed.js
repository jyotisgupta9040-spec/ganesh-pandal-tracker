const mongoose = require("mongoose");
require("dotenv").config();

const Pandal = require("./models/Pandal");

const pandals = [
  {
    name: "Lalbaugcha Raja",
    location: "Lalbaug, Mumbai",
    image: "/images/pandals/lalbaugcha-raja.webp",
    latitude: 18.9907,
    longitude: 72.8376,
    mukhWaitingTime: 45,
    charanWaitingTime: 25,
    crowdStatus: "High",
    queueStatus: "Very Long"
  },

  {
    name: "GSB Seva Mandal",
    location: "King's Circle, Mumbai",
    image: "/images/pandals/gsb-seva-mandal.webp",
    latitude: 19.0268,
    longitude: 72.8553,
    mukhWaitingTime: 30,
    charanWaitingTime: 15,
    crowdStatus: "High",
    queueStatus: "Long"
  },

  {
    name: "Andhericha Raja",
    location: "Andheri West, Mumbai",
    image: "/images/pandals/andhericha-raja.jpg",
    latitude: 19.1320,
    longitude: 72.8296,
    mukhWaitingTime: 25,
    charanWaitingTime: 10,
    crowdStatus: "Medium",
    queueStatus: "Medium"
  },

  {
    name: "Chinchpokli Chintamani",
    location: "Chinchpokli, Mumbai",
    image: "/images/pandals/chinchpokli-chintamani.jpeg",
    latitude: 18.9826,
    longitude: 72.8321,
    mukhWaitingTime: 35,
    charanWaitingTime: 20,
    crowdStatus: "High",
    queueStatus: "Long"
  },

  {
    name: "Khetwadi Ganraj",
    location: "Khetwadi, Girgaon, Mumbai",
    image: "/images/pandals/khetwadi-ganraj.jpeg",
    latitude: 18.9582,
    longitude: 72.8276,
    mukhWaitingTime: 30,
    charanWaitingTime: 15,
    crowdStatus: "Medium",
    queueStatus: "Long"
  },

  {
    name: "Mumbaicha Raja",
    location: "Ganesh Galli, Lalbaug, Mumbai",
    image: "/images/pandals/mumbaicha-raja.jpeg",
    latitude: 18.9900,
    longitude: 72.8355,
    mukhWaitingTime: 40,
    charanWaitingTime: 20,
    crowdStatus: "High",
    queueStatus: "Long"
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    await Pandal.deleteMany();

    await Pandal.insertMany(pandals);

    console.log("6 Pandals Added Successfully");

    await mongoose.connection.close();

    console.log("Database Connection Closed");
  } catch (error) {
    console.log("Error:", error.message);
  }
};

seedDatabase();