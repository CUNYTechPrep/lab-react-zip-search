import React, {useState} from "react";
import "./App.css";

function City(props) {
  return (
    <div>
      {props.newData.map((nData) => {
        return (
          <div className='border'>
            <div className="border_two">
              {nData.City}, {nData.State}
            </div>
            <div>
              <ul>
                <li>State: {nData.State}</li>
                <li>Location: ({nData.Lat}, {nData.Long})</li>
                <li>Population (estimated): {nData.EstimatedPopulation}</li>
                <li>Total Wages: {nData.TotalWages}</li>
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ZipSearchField(props) {
  const [data, setData] = useState([]);
  const [zipCode, setZipCode] = useState('');

  const fetchData = (e) => {
    const targetZipCode = e.target.value;
    setZipCode(targetZipCode);
    
    if(targetZipCode.length === 5) {
      fetch(`https://ctp-zip-api.herokuapp.com/zip/${targetZipCode}`)
      .then((response) => response.json())
      .then((responseData) => setData(responseData))
      .catch((error) => console.log(error));
    } else {
      setData([]);
    }
  }

  return (
    <div>
      <h3>Zip Code: </h3>
      <div>
        <input type="text" onChange={fetchData}></input>
        <div>
          <City newData={data}/>
          {zipCode.length < 5 && <h5>No Results</h5>}
        </div>
      </div>
    </div>
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
