import { useState } from "react";
import "./App.css";

function LocationCard({
  region,
  latitude,
  longitude,
  population,
  totalIncome,
  locationName,
}) {
  return (
    <div className="card my-5">
      <div className="card-header">{locationName}</div>
      <div className="card-body">
        <ul className="p-8 my-3">
          <li>Region: {region}</li>
          <li>
            Coordinates: ({latitude}, {longitude})
          </li>
          <li>Estimated Population: {population}</li>
          <li>Total Income: {totalIncome}</li>
        </ul>
      </div>
    </div>
  );
}

function ZipCodeInput({ onLookup }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    const formattedZip = event.target.value.replace(/\D+/g, "").slice(0, 5);
    setInputValue(formattedZip);
    console.log("Zip Code changed to:", formattedZip);

    if (formattedZip.length === 5 && !isNaN(parseInt(formattedZip))) {
      onLookup(formattedZip);
    }
  };

  return (
    <label className="d-flex align-center py-4 px-1" htmlFor="zip-input">
      <b className="py-2 w-25">Enter Zip:</b>
      <input
        id="zip-input"
        className="form-control p-1 rounded max-w"
        placeholder="Try 10016"
        value={inputValue}
        onChange={handleInputChange}
      />
    </label>
  );
}

async function fetchLocationData(zipCode, onSuccess) {
  try {
    const response = await fetch(
      `https://ctp-zip-code-api.onrender.com/zip/${zipCode}`
    );

    if (!response.ok) {
      console.error(
        `Error fetching data for ZIP: ${zipCode}, Status: ${response.status}`
      );
      onSuccess([]);
      return;
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const data = await response.json();
      console.log("Data fetched successfully:", data);
      onSuccess(data);
    } else {
      console.error("Unexpected content type, expected JSON.");
      onSuccess([]);
    }
  } catch (error) {
    console.error("Fetch error:", error);
    onSuccess([]);
  }
}

function ZipApp() {
  const [locationList, setLocationList] = useState([]);

  const searchLocation = (zipCode) => {
    console.log("Fetching data for zip code:", zipCode);
    fetchLocationData(zipCode, setLocationList);
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Find Location by Zip Code</h1>
      </div>
      <div className="mx-auto py-4 px-1" style={{ maxWidth: 400 }}>
        <ZipCodeInput onLookup={searchLocation} />
        <div>
          {locationList.length > 0
            ? locationList.map((location) => <LocationCard {...location} />)
            : "No locations found"}
        </div>
      </div>
    </div>
  );
}

export default ZipApp;
