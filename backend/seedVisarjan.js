const mongoose = require("mongoose");
require("dotenv").config();

const Pandal = require("./models/Pandal");
const Visarjan = require("./models/Visarjan");

const visarjanData = [
  {
    name: "Lalbaugcha Raja",
    date: "2026-09-29",
    time: "10:00 AM",
    location: "Girgaon Chowpatty, Mumbai",
    route: "Lalbaug → Byculla → Parel → Girgaon Chowpatty",
    description:
      "Lalbaugcha Raja visarjan procession moves through major areas of South Mumbai before immersion."
  },

  {
    name: "GSB Seva Mandal",
    date: "2026-09-29",
    time: "09:00 AM",
    location: "Sion-Koliwada, Mumbai",
    route: "King's Circle → Sion → Sion-Koliwada",
    description:
      "GSB Seva Mandal visarjan information and procession details."
  },

  {
    name: "Andhericha Raja",
    date: "2026-09-29",
    time: "11:00 AM",
    location: "Versova Beach, Mumbai",
    route: "Andheri → Four Bungalows → Versova",
    description:
      "Andhericha Raja visarjan procession and immersion information."
  },

  {
    name: "Chinchpokli Chintamani",
    date: "2026-09-29",
    time: "10:30 AM",
    location: "Girgaon Chowpatty, Mumbai",
    route: "Chinchpokli → Byculla → Girgaon",
    description:
      "Chinchpokli Chintamani visarjan procession information."
  },

  {
    name: "Khetwadi Ganraj",
    date: "2026-09-29",
    time: "12:00 PM",
    location: "Girgaon Chowpatty, Mumbai",
    route: "Khetwadi → Girgaon → Chowpatty",
    description:
      "Khetwadi Ganraj visarjan procession and immersion information."
  },

  {
    name: "Mumbaicha Raja",
    date: "2026-09-29",
    time: "01:00 PM",
    location: "Girgaon Chowpatty, Mumbai",
    route: "Ganesh Galli → Lalbaug → Byculla → Girgaon",
    description:
      "Mumbaicha Raja visarjan procession information."
  }
];

async function seedVisarjan() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    await Visarjan.deleteMany({});

    let added = 0;

    for (const item of visarjanData) {
      const pandal = await Pandal.findOne({
        name: item.name
      });

      if (!pandal) {
        console.log(`Pandal not found: ${item.name}`);
        continue;
      }

      await Visarjan.create({
        pandal: pandal._id,
        visarjanDate: item.date,
        visarjanTime: item.time,
        location: item.location,
        route: item.route,
        description: item.description
      });

      added++;
    }

    console.log(`${added} visarjan records added successfully`);

    await mongoose.connection.close();

    console.log("Database connection closed");
  } catch (error) {
    console.log("Error:");
    console.log(error.message);
  }
}

seedVisarjan();