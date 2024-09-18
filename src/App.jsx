import { useState } from "react";
import "./App.css";

function City(props) {
  return (
    <>
      <div>
        <h2>
          {props.City}, {props.State}
        </h2>
        <ul>
          <li>State: {props.State}</li>
          <li>
            Location: ({props.Lat}, {props.Long})
          </li>
          <li>Population (estimated): {props.EstimatedPopulation}</li>
          <li>Total Wages: {props.TotalWages}</li>
        </ul>
      </div>
    </>
  );
}

function ZipSearchField(props) {
  const [inputValue, setInputValue] = useState("");
  const [cities, setCities] = useState([]);

  async function handleInputChange(event) {
    setInputValue(event.target.value);
    // Check if valid zipcode
    if (!inputValue.match(/[0-9]{5}/)) return;
    console.log("Valid zipcode");
    const baseURL = "https://ctp-zip-code-api.onrender.com";
    const endpoint = `/zip/${inputValue}`;
    try {
      let response = await fetch(baseURL + endpoint);
      let body = await response.json();
      console.log("Success", body);
      // Store cities objects in temporary array
      let citiesArr = [];
      body.forEach((city) => {
        citiesArr.push(city);
      });
      // Update state with new cities
      setCities(citiesArr);
    } catch (error) {
      console.error("Error", error);
    }
  }

  return (
    <>
      <div>
        <form method="GET">
          <label htmlFor="zipcode">Zip Code: </label>
          <input
            type="text"
            name="zipcode"
            id="zipcode"
            placeholder="Try 10016"
            onChange={handleInputChange}
            value={inputValue}
          />
        </form>
      </div>
      {!cities.length ? (
        <div>No Results</div>
      ) : (
        cities.map((city) => <City key={city.RecordNumber} {...city} />)
      )}
    </>
  );
}

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField />
      </div>
    </div>
  );
}

export default App;
