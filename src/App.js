import React from "react";
import "./App.css";

function City(props) {
    return (
        <div class="card mt-5">
            <div class="card-header">
                {props.city}, {props.state}
            </div>
            <div class="card-body">
                <ul>
                    <li>State: {props.state}</li>
                    <li>Location: {props.location}</li>
                    <li>Population (estimated): {props.population}</li>
                    <li>Total Wages: {props.totalWages}</li>
                </ul>
            </div>
        </div>
    );
}

function ZipSearchField(props) {
    return (
        <div class="form-group">
            <label for="zipCode">Zip Code:</label>
            <input
                type="text"
                class="form-control"
                id="zipCode"
                placeholder="00000"
                onChange={props.onZipCodeChange}
            />
        </div>
    );
}

function App() {
    const [zipCode, setZipCode] = React.useState("");
    const [cities, setCities] = React.useState([]);

    function onZipCodeChange(event) {
        setZipCode(event.target.value);
    }

    React.useEffect(() => {
        fetch(`http://ctp-zip-api.herokuapp.com/zip/${zipCode}`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return [];
                }
            })
            .then((json) => {
                setCities(json);
            });
    }, [zipCode]);

    console.log(zipCode);

    return (
        <div className="App">
            <div className="App-header">
                <h1>Zip Code Search</h1>
            </div>
            <div className="mx-auto" style={{ maxWidth: 400 }}>
                <br />
                <ZipSearchField onZipCodeChange={onZipCodeChange} />
                <div>
                    {cities[0] ? (
                        cities.map((city) => (
                            <City
                                key={city.RecordNumber}
                                city={city.City}
                                state={city.State}
                                location={city.Lat + ", " + city.Long}
                                population={city.EstimatedPopulation}
                                totalWages={city.TotalWages}
                            />
                        ))
                    ) : (
                        <div>
                            <br />
                            <b>No results found</b>
                        </div>
                    )}
                </div>
            </div>
            <br />
        </div>
    );
}

export default App;
