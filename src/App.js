import React from "react";
import "./App.css";

function City({ city, state, location, estimatedPop, totalWages }) {
	return (
		<div>
			<div className="card mb-5">
				<div className="card-header">{`${city}, ${state}`}</div>
				<div className="card-body">
					<ul>
						<li>{`State: ${state}`}</li>
						<li>{`Location: ${location}`}</li>
						<li>{`Population (estimated): ${estimatedPop}`}</li>
						<li>{`Total Wages: ${totalWages}`}</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

function ZipSearchField(props) {
	return (
		<div className="my-5">
			<label htmlFor="zip-code">Zip Code:</label>
			<input
				type="text"
				className="form-control"
				id="zip-code"
				onChange={props.handleChange}
			/>
		</div>
	);
}

function App() {
	const [cities, setCities] = React.useState([]);

	const getZipcodeData = async (event) => {
		if (event.target.value.length === 5) {
			try {
				const response = await fetch(
					"https://ctp-zip-api.herokuapp.com/zip/" +
						event.target.value
				);
				const cities = await response.json();
				setCities(cities);
			} catch (error) {
				console.log("Error: ", error);
			}
		} else setCities([]);
	};

	return (
		<div className="App">
			<div className="App-header">
				<h1>Zip Code Search</h1>
			</div>
			<div className="mx-auto" style={{ maxWidth: 400 }}>
				<ZipSearchField handleChange={getZipcodeData} />
				<div>
					{cities.length > 0 ? (
						cities.map((city) => (
							<City
								key={city.RecordNumber}
								city={city.City}
								state={city.State}
								location={`(${city.Lat}, ${city.Long})`}
								estimatedPop={city.EstimatedPopulation}
								totalWages={city.TotalWages}
							/>
						))
					) : (
						<div>
							<strong>No results found</strong>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
