import { useEffect } from "react";
import {React, useState} from "react";
import "./App.css";

function City(props) {
  const [data, setData] = useState([]);
  useEffect (() => {
    const ZipCode = async () => {
      try {
      const response = await fetch(`https://ctp-zip-code-api.onrender.com/zip/${props.zipcode_input}`);
      const fetcheddata = await response.json();
      console.log(fetcheddata)
      setData(fetcheddata);
      }
      catch(error) {
        setData([]);
        console.log("Invalid Input", error);
      }
    }
    ZipCode();
  }, [props.zipcode_input]);

  return (
    <div>
      {data.length > 0 ? (
        <div className="valid-zipcode-container">
          {data.map((zipcodeObj) => (
            <li key={zipcodeObj.Zipcode}>
              <div className="zip-info">
                <div id='header_zip'>{zipcodeObj.City}</div>
                <div>State: {zipcodeObj.State}</div>
                <div>Location: {zipcodeObj.Lat} {zipcodeObj.Long}</div>
                <div>Population (estimated): {zipcodeObj.EstimatedPopulation}</div>
                <div>Total Wages: {zipcodeObj.TotalWages}</div>
            </div>
          </li>
          ))}
        </div>
      ) : (
        <div className="invalid-zipcode-container">
          <h3>No results found</h3>
        </div>
      )}
    </div>
  );
}

function ZipSearchField(props) {
  const [zipcode, setZipcode] = useState("");

  const handleZipCodeSubmission = (submission) => {
    if (submission.target.value.length === 5) {
      setZipcode(submission.target.value);
      console.log(submission.target.value);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    props.selectedZip(zipcode);
  }
  return (
    <div className="form-container">
      <form id="zipform" onSubmit={handleSubmit}>
        <label htmlFor="zip"> Zip Code: </label><br></br>
        <input maxLength={5} type="text" id="zip" name="zip" onChange={handleZipCodeSubmission}></input>
      </form>
    </div>
  )
}

function App() {
  const [selectedZipcode, setSelectedZipcode] = useState("");
  const handleZipCodeSubmit = (zipcode) => {
    setSelectedZipcode(zipcode);
  }
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField selectedZip={handleZipCodeSubmit}/>

          <div>
          <City zipcode_input={selectedZipcode}/>
        </div>
      </div>
    </div>
  );
}

export default App;
