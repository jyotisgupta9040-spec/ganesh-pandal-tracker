import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function PandalMap() {
  const [pandals, setPandals] = useState([]);

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
      })
      .catch((error) => {
        console.log("Map error:", error);
      });
  }, []);

  return (
    <section className="pandal-map-section">
      <h2>🗺️ Find Ganpati Pandals on Map</h2>

      <p>
        Explore the locations of famous Ganpati pandals in Mumbai.
      </p>

      <div className="map-container">
        <MapContainer
          center={[19.076, 72.8777]}
          zoom={11}
          scrollWheelZoom={true}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {pandals.map((pandal) => (
            <CircleMarker
              key={pandal._id}
              center={[pandal.latitude, pandal.longitude]}
              radius={10}
            >
              <Popup>
                <div>
                  <h3>{pandal.name}</h3>

                  <p>📍 {pandal.location}</p>

                  <p>
                    🙏 Mukh Darshan:{" "}
                    <strong>{pandal.mukhWaitingTime} min</strong>
                  </p>

                  <p>
                    👣 Charan Darshan:{" "}
                    <strong>{pandal.charanWaitingTime} min</strong>
                  </p>

                  <p>
                    👥 Crowd:{" "}
                    <strong>{pandal.crowdStatus}</strong>
                  </p>

                  <p>
                    🚶 Queue:{" "}
                    <strong>{pandal.queueStatus}</strong>
                  </p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
}

export default PandalMap;