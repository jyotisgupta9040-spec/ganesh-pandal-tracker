import { useEffect, useState } from "react";

function CrowdHistory() {
  const [crowdData, setCrowdData] = useState([]);
  const [selectedPandal, setSelectedPandal] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/crowd")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch crowd history");
        }

        return response.json();
      })
      .then((data) => {
        setCrowdData(data);

        if (data.length > 0) {
          setSelectedPandal(data[0].pandal.name);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const pandals = [
    ...new Set(
      crowdData
        .filter((item) => item.pandal)
        .map((item) => item.pandal.name)
    )
  ];

  const selectedData = crowdData.filter(
    (item) => item.pandal?.name === selectedPandal
  );

  if (loading) {
    return <h2 className="history-message">Loading Crowd History...</h2>;
  }

  return (
    <section className="crowd-history">
      <h2>📊 Crowd History</h2>

      <p className="history-subtitle">
        Check previous crowd levels, queue length and darshan waiting time.
      </p>

      <div className="pandal-select">
        <label>Select Pandal:</label>

        <select
          value={selectedPandal}
          onChange={(e) => setSelectedPandal(e.target.value)}
        >
          {pandals.map((pandal) => (
            <option key={pandal} value={pandal}>
              {pandal}
            </option>
          ))}
        </select>
      </div>

      {selectedData.length === 0 ? (
        <p className="history-message">
          No crowd history available.
        </p>
      ) : (
        <div className="history-table-container">
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Day</th>
                <th>Crowd</th>
                <th>Queue</th>
                <th>Mukh Darshan</th>
                <th>Charan Darshan</th>
              </tr>
            </thead>

            <tbody>
              {selectedData.map((item) => (
                <tr key={item._id}>
                  <td>{item.date}</td>
                  <td>{item.day}</td>
                  <td>{item.crowdLevel}</td>
                  <td>{item.queueLength}</td>
                  <td>{item.mukhWaitingTime} min</td>
                  <td>{item.charanWaitingTime} min</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default CrowdHistory;