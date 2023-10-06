import React, { useState, useEffect } from "react";
import "./App.css";

function City(props) {
  return <div>This is the City component</div>;
}

function ZipSearchField(props) {
  return <div>This is the ZipSearchField component</div>;
}

function App() {
  const [zipCode, setZipCode] = useState(''); // Default zip code
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const apiUrl = `https://ctp-zip-code-api.onrender.com/zip/${zipCode}`;

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error('No results found');
        }

        const jsonData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (err) {
        setError('No results found');
        console.error(err);
      }
    };

    fetchData(); // Fetch data when the component mounts or when zipCode changes.

  }, [zipCode, apiUrl]);

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
      <input
        type="text"
        placeholder="Enter Zip Code"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
      />
      {error && <p>{error}</p>}
      <ul>
        {data.map((item) => (
          <li key={item.RecordNumber}>
            {item.City}, {item.State}
            <br />
            State: {item.State}
            <br />
            Location: ({item.Lat}, {item.Long})
            <br />
            Population (estimated): {item.EstimatedPopulation}
            <br />
            Total Wages: {item.TotalWages}
          </li>
        ))}
      </ul>
        {/* <ZipSearchField /> */}
        <div>
          {/* <City />
          <City /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
