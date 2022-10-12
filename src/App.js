import React, { useState } from "react";
import "./App.css";

function City(props) {
	const { info } = props;

	if (info) {
		const {
			LocationText,
			State,
			Lat,
			Long,
			EstimatedPopulation,
			TotalWages,
		} = info;

		return (
			<div className="card bg-light mb-5">
				<div className="card-header">{LocationText}</div>
				<div className="card-body">
					<ul>
						<li>State: {State}</li>
						<li>
							Location: ({Lat},{Long})
						</li>
						<li>Population (estimated): {EstimatedPopulation}</li>
						<li>Total Wages: {TotalWages}</li>
					</ul>
				</div>
			</div>
		);
	} else {
		return <div className="fw-bold">No Results Found</div>;
	}
}

function ZipSearchField(props) {
	const { requestZipInfo } = props;

	return (
		<div className="mb-5">
			<label className="mt-5 fw-bold">Zip Code:</label>
			<br></br>
			<input
				className="form-control"
				type="text"
				id="zip"
				placeholder="Try 10016"
				onInput={requestZipInfo}
			></input>
		</div>
	);
}

function App() {
	const [zipInfoObj, setZipInfoObjState] = useState(null);

	const requestZipInfo = async (event) => {
		const zipcode = event.currentTarget.value;
		if (zipcode.length == 5) {
			try {
				const apiEndPoint = `https://ctp-zip-api.herokuapp.com/zip/${zipcode}`;
				const response = await fetch(apiEndPoint);
				if (response.ok) {
					const body = await response.json();
					setZipInfoObjState(body);
					console.log(zipInfoObj);
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	let infoCards;

	if (zipInfoObj) {
		infoCards = zipInfoObj.map((info, index) => (<City info={info} key={index}/>));
	} else {
		infoCards = <div className="fw-bold">No Results Found</div>;
	}

	return (
		<div className="App">
			<div className="App-header">
				<h1>Zip Code Search</h1>
			</div>

			<div className="mx-auto" style={{ maxWidth: 400 }}>
				<ZipSearchField requestZipInfo={requestZipInfo} />
				{infoCards}
			</div>
		</div>
	);
}

export default App;
