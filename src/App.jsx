import { useState } from "react";
import "./App.css";

function City({ city, state, Lat, Long, EstimatedPopulation, TotalWages }) {
    return (
        <div className="city-container">
            <h2>City: {city}</h2>
            <p>State: {state}</p>
            <p>Lat: {Lat}</p>
            <p>Long: {Long}</p>
            <p>Population: {EstimatedPopulation}</p>
            <p>Total wages: {TotalWages}</p>
        </div>
    );
}

function ZipSearchField({ onZipChange }) {
    return (
        <div className="zip-search">
            <input
                type="text"
                placeholder="Enter Zip Code"
                onChange={(e) => onZipChange(e.target.value)}
            />
        </div>
    );
}

function App() {
    const [cities, setCities] = useState([]);
    const [error, setError] = useState(null);

    const handleZipChange = async (zip) => {
        if (zip.length === 5) {
            try {
                const response = await fetch(`https://ctp-zip-code-api.onrender.com/zip/${zip}`);
                if (!response.ok) {
                    throw new Error("Zip code not found");
                }
                const data = await response.json();
                setCities(data);
                setError(null);
            } catch (error) {
                setCities([]);
                setError("No results found");
            }
        } else {
            setCities([]);
            setError(null);
        }
    };

    return (
        <div className="App">
            <div className="App-header">
                <h1>Zip Code Search</h1>
            </div>
            <div className="mx-auto" style={{ maxWidth: 400 }}>
                <ZipSearchField onZipChange={handleZipChange} />
                <div>
                    {error ? (
                        <p>{error}</p>
                    ) : (
                        cities.map((cityData) => (
                            <City
                                city={cityData.City}
                                state={cityData.State}
                                Lat={cityData.Lat}
                                Long={cityData.Long}
                                EstimatedPopulation={cityData.EstimatedPopulation}
                                TotalWages={cityData.TotalWages}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;


