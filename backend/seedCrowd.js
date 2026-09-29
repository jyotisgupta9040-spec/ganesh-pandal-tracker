const mongoose = require("mongoose");
require("dotenv").config();

const Pandal = require("./models/Pandal");
const Crowd = require("./models/Crowd");

const crowdData = [
  {
    name: "Lalbaugcha Raja",
    history: [
      {
        date: "2026-09-20",
        day: "Sunday",
        crowdLevel: "High",
        queueLength: "Very Long",
        mukhWaitingTime: 60,
        charanWaitingTime: 30
      },
      {
        date: "2026-09-21",
        day: "Monday",
        crowdLevel: "Medium",
        queueLength: "Long",
        mukhWaitingTime: 45,
        charanWaitingTime: 25
      },
      {
        date: "2026-09-22",
        day: "Tuesday",
        crowdLevel: "Very High",
        queueLength: "Extremely Long",
        mukhWaitingTime: 90,
        charanWaitingTime: 45
      }
    ]
  },

  {
    name: "GSB Seva Mandal",
    history: [
      {
        date: "2026-09-20",
        day: "Sunday",
        crowdLevel: "High",
        queueLength: "Long",
        mukhWaitingTime: 45,
        charanWaitingTime: 20
      },
      {
        date: "2026-09-21",
        day: "Monday",
        crowdLevel: "Medium",
        queueLength: "Medium",
        mukhWaitingTime: 30,
        charanWaitingTime: 15
      },
      {
        date: "2026-09-22",
        day: "Tuesday",
        crowdLevel: "High",
        queueLength: "Long",
        mukhWaitingTime: 50,
        charanWaitingTime: 25
      }
    ]
  },

  {
    name: "Andhericha Raja",
    history: [
      {
        date: "2026-09-20",
        day: "Sunday",
        crowdLevel: "Medium",
        queueLength: "Medium",
        mukhWaitingTime: 30,
        charanWaitingTime: 15
      },
      {
        date: "2026-09-21",
        day: "Monday",
        crowdLevel: "Low",
        queueLength: "Short",
        mukhWaitingTime: 20,
        charanWaitingTime: 10
      },
      {
        date: "2026-09-22",
        day: "Tuesday",
        crowdLevel: "High",
        queueLength: "Long",
        mukhWaitingTime: 40,
        charanWaitingTime: 20
      }
    ]
  },

  {
    name: "Chinchpokli Chintamani",
    history: [
      {
        date: "2026-09-20",
        day: "Sunday",
        crowdLevel: "High",
        queueLength: "Long",
        mukhWaitingTime: 50,
        charanWaitingTime: 25
      },
      {
        date: "2026-09-21",
        day: "Monday",
        crowdLevel: "Medium",
        queueLength: "Medium",
        mukhWaitingTime: 35,
        charanWaitingTime: 15
      }
    ]
  },

  {
    name: "Khetwadi Ganraj",
    history: [
      {
        date: "2026-09-20",
        day: "Sunday",
        crowdLevel: "High",
        queueLength: "Long",
        mukhWaitingTime: 45,
        charanWaitingTime: 20
      },
      {
        date: "2026-09-21",
        day: "Monday",
        crowdLevel: "Low",
        queueLength: "Short",
        mukhWaitingTime: 20,
        charanWaitingTime: 10
      }
    ]
  },

  {
    name: "Mumbaicha Raja",
    history: [
      {
        date: "2026-09-20",
        day: "Sunday",
        crowdLevel: "Medium",
        queueLength: "Medium",
        mukhWaitingTime: 30,
        charanWaitingTime: 15
      },
      {
        date: "2026-09-21",
        day: "Monday",
        crowdLevel: "High",
        queueLength: "Long",
        mukhWaitingTime: 45,
        charanWaitingTime: 20
      }
    ]
  }
];

async function seedCrowd() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    await Crowd.deleteMany({});

    let added = 0;

    for (const pandalData of crowdData) {
      const pandal = await Pandal.findOne({
        name: pandalData.name
      });

      if (!pandal) {
        console.log(`Pandal not found: ${pandalData.name}`);
        continue;
      }

      for (const history of pandalData.history) {
        await Crowd.create({
          pandal: pandal._id,
          date: history.date,
          day: history.day,
          crowdLevel: history.crowdLevel,
          queueLength: history.queueLength,
          mukhWaitingTime: history.mukhWaitingTime,
          charanWaitingTime: history.charanWaitingTime
        });

        added++;
      }
    }

    console.log(`${added} crowd history records added successfully`);

    await mongoose.connection.close();

    console.log("Database connection closed");
  } catch (error) {
    console.log("Error:");
    console.log(error.message);
  }
}

seedCrowd();