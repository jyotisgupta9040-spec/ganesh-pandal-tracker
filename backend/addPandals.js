require("dotenv").config();

const mongoose = require("mongoose");
const Pandal = require("./models/Pandal");

const pandals = [
  {
    name: "Lalbaugcha Raja",
    location: "Lalbaug, Mumbai",
    image: "/images/lalbaugcha-raja.webp",
    mukhDarshan: 45,
    charanDarshan: 25,
    crowd: "High Crowd",
    queue: "Very Long",
    aartiTime: "12:30 PM"
  },

  {
    name: "GSB Seva Mandal",
    location: "King's Circle, Mumbai",
    image: "/images/gsb-ganpati.webp",
    mukhDarshan: 30,
    charanDarshan: 15,
    crowd: "High Crowd",
    queue: "Long",
    aartiTime: "1:00 PM"
  },

  {
    name: "Andhericha Raja",
    location: "Andheri, Mumbai",
    image: "/images/andhericha-raja.jpg",
    mukhDarshan: 25,
    charanDarshan: 10,
    crowd: "Medium Crowd",
    queue: "Medium",
    aartiTime: "1:30 PM"
  },

  {
    name: "Ganesh Galli Mumbaicha Raja",
    location: "Lalbaug, Mumbai",
    image: "/images/ganesh-galli.jpeg",
    mukhDarshan: 40,
    charanDarshan: 20,
    crowd: "High Crowd",
    queue: "Long",
    aartiTime: "2:00 PM"
  },

  {
    name: "Khetwadi Ganraj",
    location: "Girgaon, Mumbai",
    image: "/images/khetwadi-ganraj.jpeg",
    mukhDarshan: 35,
    charanDarshan: 15,
    crowd: "Medium Crowd",
    queue: "Long",
    aartiTime: "2:30 PM"
  },

  {
    name: "Chinchpokli Chintamani",
    location: "Chinchpokli, Mumbai",
    image: "/images/chinchpokli-chintamani.jpeg",
    mukhDarshan: 30,
    charanDarshan: 15,
    crowd: "High Crowd",
    queue: "Very Long",
    aartiTime: "3:00 PM"
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    await Pandal.deleteMany();

    await Pandal.insertMany(pandals);

    console.log("All pandals added successfully!");

    mongoose.connection.close();
  })
  .catch((error) => {
    console.log("Error:");
    console.log(error.message);
  });