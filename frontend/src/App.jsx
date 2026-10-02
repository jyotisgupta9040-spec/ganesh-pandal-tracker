import { useEffect, useState } from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

function App() {
  const [pandals, setPandals] = useState([]);
  const [selectedPandal, setSelectedPandal] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState("home");
  const [showCrowdHistory, setShowCrowdHistory] = useState(false);
  const [selectedDate, setSelectedDate] = useState("2026-09-14");
  const visarjanData = [
  {
    name: "Lalbaugcha Raja",
    date: "25 September 2026",
    place: "Girgaon Chowpatty, Mumbai",
    route: "Lalbaug → Byculla → Dr. S. S. Rao Road → Lamington Road → Girgaon Chowpatty",
    timing: "Procession started on 25 September",
    description:
      "Lalbaugcha Raja's 2026 immersion procession travelled through central Mumbai before reaching Girgaon Chowpatty.",
    maps:
      "https://www.google.com/maps/dir/?api=1&destination=18.9548,72.8120",
  },

  {
    name: "Ganesh Galli Mumbaicha Raja",
    date: "25 September 2026",
    place: "Girgaon Chowpatty, Mumbai",
    route: "Ganesh Galli, Lalbaug → Central Mumbai → Girgaon Chowpatty",
    timing: "Procession began in the morning",
    description:
      "Mumbaicha Raja's immersion procession travelled from Lalbaug towards Girgaon Chowpatty. The idol was immersed using a barge.",
    maps:
      "https://www.google.com/maps/dir/?api=1&destination=18.9548,72.8120",
  },

  {
    name: "Chinchpokli Chintamani",
    date: "25–26 September 2026",
    place: "Girgaon Chowpatty, Mumbai",
    route: "Chinchpokli → Central Mumbai → Girgaon Chowpatty",
    timing: "Procession continued into 26 September",
    description:
      "Chinchpokli Chintamani's 2026 immersion procession travelled towards Girgaon Chowpatty.",
    maps:
      "https://www.google.com/maps/dir/?api=1&destination=18.9548,72.8120",
  },

  {
    name: "Andhericha Raja",
    date: "29 September 2026",
    place: "Versova Beach, Mumbai",
    route: "Azad Nagar → Andheri Market → Seven Bungalows → Versova",
    timing: "Procession scheduled from around 5:30 PM",
    description:
      "Andhericha Raja follows the traditional delayed immersion after Anant Chaturdashi. The 2026 procession started from Azad Nagar and proceeded towards Versova.",
    maps:
      "https://www.google.com/maps/dir/?api=1&destination=19.1335,72.8150",
  },

  {
    name: "GSB Seva Mandal",
    date: "2026",
    place: "Immersion details to be verified",
    route: "Details will be added after verification",
    timing: "Details will be added",
    description:
      "GSB Seva Mandal's 2026 festival information is available, but the specific immersion details will be added after verification.",
    maps: "https://www.google.com/maps",
  },

  {
    name: "Khetwadi Ganraj",
    date: "2026",
    place: "Immersion details to be verified",
    route: "Details will be added after verification",
    timing: "Details will be added",
    description:
      "The specific 2026 immersion details for Khetwadi Ganraj will be added after verification.",
    maps: "https://www.google.com/maps",
  },
];
  const pandalLocations = [
  {
    name: "Lalbaugcha Raja",
    location: "Lalbaug, Mumbai",
    position: [18.9959, 72.8376],
  },
  {
    name: "GSB Seva Mandal",
    location: "King's Circle, Mumbai",
    position: [19.0255, 72.8610],
  },
  {
    name: "Andhericha Raja",
    location: "Azad Nagar, Andheri West, Mumbai",
    position: [19.1365, 72.8374],
  },
  {
    name: "Ganesh Galli Mumbaicha Raja",
    location: "Ganesh Galli, Lalbaug, Mumbai",
    position: [18.9947, 72.8370],
  },
  {
    name: "Khetwadi Ganraj",
    location: "Khetwadi, Mumbai",
    position: [18.9607, 72.8236],
  },
  {
    name: "Chinchpokli Chintamani",
    location: "Chinchpokli, Mumbai",
    position: [18.9853, 72.8330],
  },
];


  useEffect(() => {
    fetch("http://localhost:5000/api/pandals")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch pandals");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Pandals received:", data);
        setPandals(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pandals:", error);
        setLoading(false);
      });
  }, []);

  const filteredPandals = pandals.filter((pandal) =>
    pandal.name?.toLowerCase().includes(search.toLowerCase())
  );

  const getImageUrl = (image) => {
    if (!image) return "";

    if (image.startsWith("http")) {
      return image;
    }

    return image;
  };

  /*
    TEMPORARY CROWD HISTORY DATA
  */

  const crowdHistory = {
    "2026-09-14": {
      crowd: "Medium",
      queue: "Medium",
      waitingTime: "30–45 minutes",
    },

    "2026-09-15": {
      crowd: "High",
      queue: "Long",
      waitingTime: "45–60 minutes",
    },

    "2026-09-16": {
      crowd: "High",
      queue: "Long",
      waitingTime: "60–75 minutes",
    },

    "2026-09-17": {
      crowd: "Very High",
      queue: "Very Long",
      waitingTime: "75–90 minutes",
    },

    "2026-09-18": {
      crowd: "High",
      queue: "Long",
      waitingTime: "60–75 minutes",
    },

    "2026-09-19": {
      crowd: "Very High",
      queue: "Very Long",
      waitingTime: "90–120 minutes",
    },

    "2026-09-20": {
      crowd: "Very High",
      queue: "Very Long",
      waitingTime: "90–120 minutes",
    },

    "2026-09-21": {
      crowd: "High",
      queue: "Long",
      waitingTime: "60–75 minutes",
    },

    "2026-09-22": {
      crowd: "High",
      queue: "Long",
      waitingTime: "60–75 minutes",
    },

    "2026-09-23": {
      crowd: "Very High",
      queue: "Very Long",
      waitingTime: "90–120 minutes",
    },

    "2026-09-24": {
      crowd: "Very High",
      queue: "Very Long",
      waitingTime: "120+ minutes",
    },

    "2026-09-25": {
      crowd: "Very High",
      queue: "Very Long",
      waitingTime: "120+ minutes",
    },
  };

  const dates = [
    "2026-09-14",
    "2026-09-15",
    "2026-09-16",
    "2026-09-17",
    "2026-09-18",
    "2026-09-19",
    "2026-09-20",
    "2026-09-21",
    "2026-09-22",
    "2026-09-23",
    "2026-09-24",
    "2026-09-25",
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString + "T00:00:00");

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const currentCrowd = crowdHistory[selectedDate];

  /*
    COMMON NAVIGATION
  */

  const goHome = () => {
    setActivePage("home");
    setSelectedPandal(null);
    setShowCrowdHistory(false);
  };

  const goPandals = () => {
    setActivePage("pandals");
    setSelectedPandal(null);
    setShowCrowdHistory(false);
  };

  const goMap = () => {
    setActivePage("map");
    setSelectedPandal(null);
    setShowCrowdHistory(false);
  };

  const goVisarjan = () => {
    setActivePage("visarjan");
    setSelectedPandal(null);
    setShowCrowdHistory(false);
  };

  const goAbout = () => {
    setActivePage("about");
    setSelectedPandal(null);
    setShowCrowdHistory(false);
  };

  /*
    NAVBAR
  */

  const Navbar = () => {
    return (
      <nav className="navbar">

        <div className="logo-section">

          <div className="ganesh-logo">
            ॐ
          </div>

          <h1>
            Ganesh Pandal Tracker
          </h1>

        </div>

        <div className="nav-links">

          <button
            className={activePage === "home" ? "active" : ""}
            onClick={goHome}
          >
            🏠 Home
          </button>

          <button
            className={activePage === "pandals" ? "active" : ""}
            onClick={goPandals}
          >
            🛕 Pandals
          </button>

          <button
            className={activePage === "map" ? "active" : ""}
            onClick={goMap}
          >
            📍 Map
          </button>

          <button
            className={activePage === "visarjan" ? "active" : ""}
            onClick={goVisarjan}
          >
            🌊 Visarjan
          </button>

          <button
            className={activePage === "about" ? "active" : ""}
            onClick={goAbout}
          >
            ⓘ About
          </button>

        </div>

        <div className="ganpati-message">
          ॥ Ganpati Bappa Morya ॥
        </div>

      </nav>
    );
  };

  /*
    CROWD HISTORY PAGE
  */

  if (showCrowdHistory && selectedPandal) {
    return (
      <div className="details-page">

        <Navbar />

        <main className="details-container">

          <button
            className="back-button"
            onClick={() => setShowCrowdHistory(false)}
          >
            ← Back to Pandal Details
          </button>

          <div className="crowd-history-page">

            <div className="crowd-header">

              <img
                src={getImageUrl(selectedPandal.image)}
                alt={selectedPandal.name}
                className="crowd-pandal-image"
              />

              <div>

                <p className="details-tag">
                  📅 Historical Crowd Information
                </p>

                <h1>
                  {selectedPandal.name}
                </h1>

                <p className="details-location">
                  📍 {selectedPandal.location}
                </p>

                <p className="crowd-period">
                  Festival Period: 14 September 2026 – 25 September 2026
                </p>

              </div>

            </div>

            <hr />

            <h2>
              Check Crowd History
            </h2>

            <p className="crowd-description">
              Select a festival date to view the crowd level,
              queue status and estimated waiting time.
            </p>

            <div className="date-selector">

              <label htmlFor="crowd-date">
                📅 Select Festival Date
              </label>

              <select
                id="crowd-date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              >

                {dates.map((date) => (
                  <option key={date} value={date}>
                    {formatDate(date)}
                  </option>
                ))}

              </select>

            </div>

            <div className="selected-date-heading">

              <h2>
                {formatDate(selectedDate)}
              </h2>

            </div>

            <div className="crowd-info-grid">

              <div className="crowd-info-box">

                <div className="crowd-icon">
                  👥
                </div>

                <h3>
                  Crowd Level
                </h3>

                <p>
                  {currentCrowd.crowd}
                </p>

              </div>

              <div className="crowd-info-box">

                <div className="crowd-icon">
                  🚶
                </div>

                <h3>
                  Queue Status
                </h3>

                <p>
                  {currentCrowd.queue}
                </p>

              </div>

              <div className="crowd-info-box">

                <div className="crowd-icon">
                  ⏱️
                </div>

                <h3>
                  Estimated Waiting Time
                </h3>

                <p>
                  {currentCrowd.waitingTime}
                </p>

              </div>

            </div>

            <div className="crowd-note">

              <strong>
                ℹ️ Historical Information
              </strong>

              <p>
                This section displays crowd-history information
                for the Ganesh Chaturthi festival period from
                14 September 2026 to 25 September 2026.
              </p>

            </div>

            <div className="crowd-navigation">

              <button
                onClick={() => {
                  const currentIndex = dates.indexOf(selectedDate);

                  if (currentIndex > 0) {
                    setSelectedDate(
                      dates[currentIndex - 1]
                    );
                  }
                }}
                disabled={dates.indexOf(selectedDate) === 0}
              >
                ← Previous Day
              </button>

              <button
                onClick={() => {
                  const currentIndex = dates.indexOf(selectedDate);

                  if (currentIndex < dates.length - 1) {
                    setSelectedDate(
                      dates[currentIndex + 1]
                    );
                  }
                }}
                disabled={
                  dates.indexOf(selectedDate) === dates.length - 1
                }
              >
                Next Day →
              </button>

            </div>

          </div>

        </main>

      </div>
    );
  }

  /*
    PANDAL DETAILS PAGE
  */

  if (selectedPandal) {
    return (
      <div className="details-page">

        <Navbar />

        <main className="details-container">

          <button
            className="back-button"
            onClick={goPandals}
          >
            ← Back to Pandals
          </button>

          <div className="details-card">

            <img
              src={getImageUrl(selectedPandal.image)}
              alt={selectedPandal.name}
              className="details-image"
            />

            <div className="details-content">

              <p className="details-tag">
                🙏 Famous Ganpati Pandal
              </p>

              <h1>
                {selectedPandal.name}
              </h1>

              <p className="details-location">
                📍 {selectedPandal.location}
              </p>

              <hr />

              <h2>
                About This Pandal
              </h2>

              <p>
                Explore information about {selectedPandal.name},
                including its location, crowd history, map,
                visarjan details and travel information.
              </p>

              <div className="details-grid">

                <button
                  className="detail-box clickable-box"
                  onClick={() => {
                    setSelectedDate("2026-09-14");
                    setShowCrowdHistory(true);
                  }}
                >

                  <span>
                    📅
                  </span>

                  <div>
                    <strong>
                      Crowd History
                    </strong>

                    <p>
                      View crowd information by festival date
                    </p>
                  </div>

                </button>

                <button
                  className="detail-box clickable-box"
                  onClick={goMap}
                >

                  <span>
                    🗺️
                  </span>

                  <div>
                    <strong>
                      Location
                    </strong>

                    <p>
                      {selectedPandal.location}
                    </p>
                  </div>

                </button>

                <button
                  className="detail-box clickable-box"
                  onClick={goVisarjan}
                >

                  <span>
                    🌊
                  </span>

                  <div>
                    <strong>
                      Visarjan
                    </strong>

                    <p>
                      Visarjan date and location
                    </p>
                  </div>

                </button>

                <button
                  className="detail-box clickable-box"
                  onClick={goMap}
                >

                  <span>
                    🚗
                  </span>

                  <div>
                    <strong>
                      How to Reach
                    </strong>

                    <p>
                      Travel options and directions
                    </p>
                  </div>

                </button>

              </div>

              <div className="future-features">

                <h2>
                  Explore More
                </h2>

                <div className="feature-buttons">

                  <button
                    onClick={() => {
                      setSelectedDate("2026-09-14");
                      setShowCrowdHistory(true);
                    }}
                  >
                    👥 Crowd History
                  </button>

                  <button onClick={goMap}>
                    🗺️ View on Map
                  </button>

                  <button onClick={goVisarjan}>
                    🌊 Visarjan Details
                  </button>

                  <button onClick={goMap}>
                    🚗 Get Directions
                  </button>

                </div>

              </div>

            </div>

          </div>

        </main>

      </div>
    );
  }
/*
  MAP PAGE
*/

if (activePage === "map") {
  return (
    <div className="app">

      <Navbar />

      <main className="main-content">

        <div className="section-heading">

          <div>

            <h2>
              📍 Ganpati Pandal Map
            </h2>

            <p>
              Explore the locations of famous Ganpati pandals
              across Mumbai.
            </p>

          </div>

        </div>

        <div className="map-page-card">

          <MapContainer
            center={[19.0760, 72.8777]}
            zoom={12}
            scrollWheelZoom={true}
            className="pandal-map"
          >

            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {pandalLocations.map((pandal) => (

              <Marker
                key={pandal.name}
                position={pandal.position}
              >

                <Popup>

                  <div className="map-popup">

                    <h3>
                      🛕 {pandal.name}
                    </h3>

                    <p>
                      📍 {pandal.location}
                    </p>

                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${pandal.position[0]},${pandal.position[1]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      🚗 Get Directions
                    </a>

                  </div>

                </Popup>

              </Marker>

            ))}

          </MapContainer>

        </div>

        <div className="map-location-list">

          <h2>
            🛕 Pandal Locations
          </h2>

          <div className="map-location-grid">

            {pandalLocations.map((pandal) => (

              <div
                className="map-location-card"
                key={pandal.name}
              >

                <h3>
                  {pandal.name}
                </h3>

                <p>
                  📍 {pandal.location}
                </p>

                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${pandal.position[0]},${pandal.position[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🚗 Get Directions →
                </a>

              </div>

            ))}

          </div>

        </div>

      </main>

      <footer>

        <h3>
          🙏 Ganpati Bappa Morya 🙏
        </h3>

        <p>
          Ganesh Pandal Tracker • Mumbai
        </p>

      </footer>

    </div>
  );
}
  /*
    VISARJAN PAGE
  */

  if (activePage === "visarjan") {
  return (
    <div className="app">
      <Navbar />

      <main className="main-content">
        <div className="section-heading">
          <div>
            <h2>🌊 Ganpati Visarjan 2026</h2>
            <p>
              Explore the historical visarjan information of famous Mumbai
              Ganpati pandals.
            </p>
          </div>
        </div>

        <div className="visarjan-intro">
          <h2>🙏 Ganpati Bappa Morya</h2>
          <p>
            This section provides information about the 2026 Ganpati
            visarjan processions, immersion locations and routes.
          </p>
          <p className="visarjan-note">
            📅 Festival period: 14 September – 25 September 2026
          </p>
        </div>

        <div className="visarjan-grid">
          {visarjanData.map((item) => (
            <div className="visarjan-card" key={item.name}>
              <div className="visarjan-card-header">
                <span className="visarjan-icon">🌊</span>
                <h2>{item.name}</h2>
              </div>

              <div className="visarjan-info">
                <div>
                  <strong>📅 Visarjan Date</strong>
                  <p>{item.date}</p>
                </div>

                <div>
                  <strong>📍 Immersion Location</strong>
                  <p>{item.place}</p>
                </div>

                <div>
                  <strong>🕐 Timing</strong>
                  <p>{item.timing}</p>
                </div>

                <div>
                  <strong>🛣️ Procession Route</strong>
                  <p>{item.route}</p>
                </div>
              </div>

              <div className="visarjan-description">
                <strong>About the Visarjan</strong>
                <p>{item.description}</p>
              </div>

              <a
                href={item.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="directions-button"
              >
                🚗 Get Directions
              </a>
            </div>
          ))}
        </div>

        <div className="visarjan-travel">
          <h2>🚗 How to Reach Visarjan Locations</h2>

          <div className="travel-grid">
            <div className="travel-card">
              <h3>🚕 By Car / Taxi</h3>
              <p>
                Open the Get Directions button on any card to view the route
                in Google Maps.
              </p>
            </div>

            <div className="travel-card">
              <h3>🚆 By Train</h3>
              <p>
                Mumbai local trains can be used to reach areas such as
                Girgaon, Chinchpokli, Byculla and Andheri.
              </p>
            </div>

            <div className="travel-card">
              <h3>🚌 By Bus</h3>
              <p>
                BEST bus services connect different parts of Mumbai with
                major immersion areas.
              </p>
            </div>

            <div className="travel-card">
              <h3>🚶 Walking</h3>
              <p>
                During major processions, some roads may have restrictions.
                Follow local traffic and police instructions.
              </p>
            </div>
          </div>
        </div>

        <div className="visarjan-media">
          <h2>📸 Visarjan Memories</h2>

          <div className="media-placeholder">
            <div>
              <span>🎥</span>
              <h3>Photos & Videos</h3>
              <p>
                Visarjan photos and videos can be added here for the famous
                Ganpati pandals.
              </p>
              <p>
                Your own photos can be stored inside the project's
                <strong> public/images </strong>
                folder.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <h3>🙏 Ganpati Bappa Morya 🙏</h3>
        <p>Ganesh Pandal Tracker • Mumbai</p>
      </footer>
    </div>
  );
}

  /*
    ABOUT PAGE
  */

  if (activePage === "about") {
  return (
    <div className="app">
      <Navbar />

      <main className="main-content">
        <div className="section-heading">
          <div>
            <h2>ⓘ About Ganesh Pandal Tracker</h2>
            <p>
              Discover famous Ganpati pandals, crowd history, locations and
              visarjan information across Mumbai.
            </p>
          </div>
        </div>

        <div className="about-hero">
          <div className="about-hero-icon">ॐ</div>

          <div>
            <h1>Ganesh Pandal Tracker</h1>
            <p>
              Your guide to exploring Mumbai's famous Ganpati pandals and
              learning about their festival journey.
            </p>
          </div>
        </div>

        <div className="about-section">
          <h2>🙏 About the Website</h2>

          <p>
            Ganesh Pandal Tracker brings useful information about some of
            Mumbai's most famous Ganpati pandals together in one place.
          </p>

          <p>
            Visitors can explore pandal locations, view historical crowd
            information, discover visarjan details and find directions to
            different locations across Mumbai.
          </p>
        </div>

        <div className="about-section">
          <h2>✨ What You Can Explore</h2>

          <div className="about-feature-grid">
            <div className="about-feature-card">
              <div className="about-feature-icon">🛕</div>
              <h3>Famous Pandals</h3>
              <p>
                Explore information about some of Mumbai's well-known Ganpati
                pandals, including their locations and details.
              </p>
            </div>

            <div className="about-feature-card">
              <div className="about-feature-icon">📊</div>
              <h3>Crowd History</h3>
              <p>
                Explore crowd information by festival date and understand how
                crowd levels changed throughout the festival period.
              </p>
            </div>

            <div className="about-feature-card">
              <div className="about-feature-icon">📍</div>
              <h3>Interactive Map</h3>
              <p>
                Find pandals on the Mumbai map and open directions for
                reaching their locations.
              </p>
            </div>

            <div className="about-feature-card">
              <div className="about-feature-icon">🌊</div>
              <h3>Visarjan Information</h3>
              <p>
                Learn about immersion locations, procession routes, dates and
                important visarjan information.
              </p>
            </div>

            <div className="about-feature-card">
              <div className="about-feature-icon">🚗</div>
              <h3>Get Directions</h3>
              <p>
                Open map directions to help plan your journey to a selected
                pandal or immersion location.
              </p>
            </div>

            <div className="about-feature-card">
              <div className="about-feature-icon">📅</div>
              <h3>Festival Dates</h3>
              <p>
                Explore information related to the Ganesh Chaturthi festival
                period from 14 September to 25 September 2026.
              </p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>🗺️ Exploring Mumbai's Ganpati Tradition</h2>

          <p>
            Mumbai's Ganesh Chaturthi celebrations bring together beautiful
            idols, decorated pandals, cultural traditions and large community
            processions.
          </p>

          <p>
            Ganesh Pandal Tracker helps visitors explore these celebrations
            digitally by bringing important location, crowd and visarjan
            information together.
          </p>
        </div>

        <div className="about-section about-highlight">
          <h2>📅 Festival Period 2026</h2>

          <div className="festival-date">
            <span>14 September 2026</span>
            <strong>→</strong>
            <span>25 September 2026</span>
          </div>

          <p>
            The website also preserves historical information so visitors can
            explore what happened during the festival period even after the
            celebrations have ended.
          </p>
        </div>

        <div className="about-section">
          <h2>ℹ️ Information & Data</h2>

          <p>
            Information displayed on the website is organized from available
            public information about Ganpati pandals, festival events,
            locations and visarjan activities.
          </p>

          <p>
            Crowd-history information is presented according to the dates
            available in the tracker.
          </p>
        </div>

        <div className="about-message">
          <div className="about-message-icon">🙏</div>

          <h2>Ganpati Bappa Morya!</h2>

          <p>
            Explore. Discover. Remember the celebrations.
          </p>
        </div>
      </main>

      <footer>
        <h3>🙏 Ganpati Bappa Morya 🙏</h3>
        <p>Ganesh Pandal Tracker • Mumbai</p>
      </footer>
    </div>
  );
}

  /*
    HOME / PANDALS PAGE
  */

  return (
    <div className="app">

      <Navbar />

      <section className="hero">

        <div className="hero-left">

          <div className="ganesh-art">
            🙏
          </div>

        </div>

        <div className="hero-center">

          <h2>
            Explore Mumbai's Famous Ganpati Pandals
          </h2>

          <p>
            Discover famous Ganpati pandals, check crowd
            history, view maps, see visarjan details and more.
          </p>

          <div className="search-box">

            <span>
              🔍
            </span>

            <input
              type="text"
              placeholder="Search by Pandal Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button>
              Search
            </button>

          </div>

        </div>

        <div className="festival-box">

          <div className="calendar-icon">
            📅
          </div>

          <strong>
            Festival Period
          </strong>

          <p>
            14 September 2026
            <br />
            –
            <br />
            25 September 2026
          </p>

        </div>

      </section>

      <main className="main-content">

        <div className="section-heading">

          <div>

            <h2>
              🛕 Famous Ganpati Pandals
            </h2>

            <p>
              Click on any pandal image to view detailed
              information, crowd history, location,
              visarjan and more.
            </p>

          </div>

        </div>

        {loading ? (

          <div className="loading">

            <h2>
              🙏 Loading Ganpati Pandals...
            </h2>

          </div>

        ) : filteredPandals.length === 0 ? (

          <div className="no-results">

            <h2>
              No pandals found
            </h2>

            <p>
              Try searching with another pandal name.
            </p>

          </div>

        ) : (

          <div className="pandal-grid">

            {filteredPandals.map((pandal) => (

              <div
                className="pandal-card"
                key={pandal._id}
                onClick={() => {
                  setSelectedPandal(pandal);
                  setActivePage("pandals");
                }}
              >

                <div className="image-container">

                  <img
                    src={getImageUrl(pandal.image)}
                    alt={pandal.name}
                    className="pandal-image"
                  />

                  <div className="image-overlay">
                    View Details →
                  </div>

                </div>

                <div className="card-info">

                  <h3>
                    {pandal.name}
                  </h3>

                  <p>
                    📍 {pandal.location}
                  </p>

                  <span className="arrow">
                    →
                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

      <footer>

        <h3>
          🙏 Ganpati Bappa Morya 🙏
        </h3>

        <p>
          Ganesh Pandal Tracker • Mumbai
        </p>

      </footer>

    </div>
  );
}

export default App;