import {useState, useEffect} from "react";
import "./App.css";

function City(props) {
  return <div class="card mb-5">
    <div class="card-header">{props.city.City}, {props.city.State}</div>
    <ul class="card-body">
      <li>State: {props.city.State}</li>
      <li>Location: ({props.city.Lat}, {props.city.Long})</li>
      <li>Population (estimated): {props.city.EstimatedPopulation}</li>
      <li>Total Wages: {props.city.TotalWages}</li>
    </ul>
  </div>;
}

function ZipSearchField(props) {
  return (
    <div class="my-5">
      Zip code: 
        <input class="form-control" onChange={props.UserZipInput} type="text"/>
    </div>
  )
}

function App() {
  const [zip, setZip] = useState("");
  const [data, setData] = useState([]);

  const ZipSearchHandler = (e) => {
    if (e.target.value.length !== 5 && e.target.value.match(/^[0-9]/)) {
      setData([]);
    }
    if (e.target.value.length === 5 && e.target.value.match(/[0-9]/)) {
      setZip(e.target.value);
    }
  }

  const DataFetcher = async () => {
    try {
      const response = await fetch(`https://ctp-zip-code-api.onrender.com/zip/${zip}`);
      const data = await response.json();
      setData(data);
    }
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {DataFetcher(zip)}, [zip]);

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField UserZipInput={ZipSearchHandler} />
        <div>
        {data.length > 0 ? (
          data.map((city, index) => <City key={index} city={city}/>)
        ) : (
          <strong>No results found</strong>
        )}
        </div>
      </div>
    </div>
  );
}

export default App;
