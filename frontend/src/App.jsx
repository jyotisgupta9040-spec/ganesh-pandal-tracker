import { useEffect, useState } from "react";
import CrowdHistory from "./components/CrowdHistory/CrowdHistory";
import PandalMap from "./components/Map/PandalMap";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PandalDetails from "./components/PandalDetails/PandalDetails";
import "./App.css";

function Home() {
  const [pandals, setPandals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/pandals")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch pandals");
        }

        return response.json();
      })
      .then((data) => {
        setPandals(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Pandal data load nahi ho raha.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2 className="message">Loading Pandals...</h2>;
  }

  if (error) {
    return <h2 className="message">{error}</h2>;
  }

  return (
    <div className="app">

      <header className="header">
        <h1>🙏 Ganesh Pandal Tracker</h1>

        <p>
          Explore famous Ganpati Pandals, Darshan information,
          Crowd History & Visarjan details
        </p>
      </header>

      <main className="container">

        <h2>Famous Ganpati Pandals</h2>

        <div className="pandal-grid">

          {pandals.map((pandal) => (

            <Link
              to={`/pandal/${pandal._id}`}
              className="pandal-card"
              key={pandal._id}
            >

              <div className="image-container">

                <img
                  src={pandal.image}
                  alt={pandal.name}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />

              </div>

              <div className="card-content">

                <h3>{pandal.name}</h3>

                <p className="location">
                  📍 {pandal.location}
                </p>

                <div className="info">

                  <div>
                    🙏 <strong>Mukh Darshan</strong>

                    <span>
                      {pandal.mukhWaitingTime ?? pandal.mukh ?? 0} min
                    </span>
                  </div>

                  <div>
                    👣 <strong>Charan Darshan</strong>

                    <span>
                      {pandal.charanWaitingTime ?? pandal.charan ?? 0} min
                    </span>
                  </div>

                  <div>
                    👥 <strong>Crowd</strong>

                    <span>
                      {pandal.crowdStatus ?? pandal.crowd ?? "Medium"}
                    </span>
                  </div>

                  <div>
                    🚶 <strong>Queue</strong>

                    <span>
                      {pandal.queueStatus ?? pandal.queue ?? "Medium"}
                    </span>
                  </div>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </main>

      <CrowdHistory />

      <PandalMap />

    </div>
  );
}


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Home Page */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* Pandal Details Page */}

        <Route
          path="/pandal/:id"
          element={<PandalDetails />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;