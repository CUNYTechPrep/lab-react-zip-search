import { useState } from "react";
import "./App.css";

// City component that displays city info uppon entering existing Zip Code //
function City(props) {
  const { city, state, population, wages, lat, long } = props.data;

  return (
    <div className="card mb-2">
      <div className="card-body">
{/* 
        <strong>Printing out all the properties for testring:</strong>
        <pre>{JSON.stringify(props.data, null, 2)}</pre>
        <pre>{JSON.stringify(props, null, 2)}</pre> */}

        <h4 className="card-title text-center">
          {city}, {state}
        </h4>
        <ul>
          <li className="card-text">State: {state}</li>
          <li className="card-text">Location: Latitude: {lat}, Longitude: {long}</li>
          <li className="card-text">Population (estimated): {population}</li>
          <li className="card-text">Total Wages: ${wages}</li>
        </ul>
      </div>
    </div>
  );

}

// ZipSearchField component handles user input
function ZipSearchField(props) {
  const { value, onChange } = props;

  return (
    <div className="form-group mb-4 mt-4">

       {/* <strong>Printing out all the properties for testring:</strong>
       <pre>{JSON.stringify(props, null, 2)}</pre> */}
       
      <label htmlFor="zipCode"><strong><h5>Enter Zip Code:</h5></strong></label>
      <input
      style={{ marginLeft: '40px', fontWeight: 'bold' }}
        type="text"
        id="zipCode"
        className="form-controll-lg text-center"
        value={value}
        onChange={onChange}
        placeholder="in this field"
      />
    </div>
  );
}

function App() {
  const [zipCode, setZipCode] = useState("");
  const [cityData, setCityData] = useState([]);
  const [error, setError] = useState(null);

  // Function to handle input changes
  const handleZipCodeChange = async (event) => {
    const newZipCode = event.target.value;
    setZipCode(newZipCode);

    // Avoid unnecessary API calls for incomplete zip codes
    if (newZipCode.length === 5) {
      try {
        const response = await fetch(`https://ctp-zip-code-api.onrender.com/zip/${newZipCode}`);
        // Both do the same thing //
        // const response = await fetch("https://ctp-zip-code-api.onrender.com/zip/" + newZipCode);
        if (response.ok) {
          const data = await response.json();
          // console.log(data);
          setCityData(data);
          setError(null); // Clear error if request is successful
        } else {
          setCityData([]);
          setError("No results found");
        }
      } catch (error) {
        setCityData([]);
        setError("An error occurred while fetching data.");
      }
    } else {
      setCityData([]); // Clear city data if input is cleared or incomplete
      setError(null); // Clear error when resetting
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1><strong>Zip Code Search</strong></h1>
      </div>

      <div className="mx-auto" style={{ maxWidth: 400 }}>
        {/* ZipSearchField component */}
        <ZipSearchField value={zipCode} onChange={handleZipCodeChange} />

        {/* Show city information if available, otherwise show error */}
        <div>
          {error && <p>{error}</p>}
          {cityData.length > 0 &&
            cityData.map((city, index) => (
              <City
                key={index}
                data={{
                  city: city.City,
                  state: city.State,
                  population: city.EstimatedPopulation,
                  wages: city.TotalWages,
                  lat: city.Lat,
                  long: city.Long,
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
