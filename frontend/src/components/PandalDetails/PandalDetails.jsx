import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function PandalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pandal, setPandal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/pandals/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPandal(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <h2 className="message">Loading Pandal Details...</h2>;
  }

  if (!pandal) {
    return <h2 className="message">Pandal not found</h2>;
  }

  return (
    <div className="pandal-details">

      <button
        className="back-button"
        onClick={() => navigate("/")}
      >
        ← Back to Pandals
      </button>

      <div className="details-card">

        <img
          src={pandal.image}
          alt={pandal.name}
          className="details-image"
        />

        <div className="details-content">

          <h1>🙏 {pandal.name}</h1>

          <p className="details-location">
            📍 {pandal.location}
          </p>

          <div className="completed-status">
            ✅ 2026 Ganesh Festival Completed
          </div>

          <h2>🛕 About This Pandal</h2>

          <p>
            {pandal.name} is one of the famous Ganpati pandals
            in Mumbai. Here you can explore information about
            darshan, crowd history, location and visarjan.
          </p>

          <h2>📊 2026 Crowd History</h2>

          <p>
            View previous crowd levels, queue information and
            darshan waiting-time history.
          </p>

          <h2>🪔 Visarjan Information</h2>

          <p>
            View the 2026 visarjan date, time, location and route.
          </p>

          <h2>🗺️ Location</h2>

          <p>
            📍 {pandal.location}
          </p>

        </div>
      </div>

    </div>
  );
}

export default PandalDetails;