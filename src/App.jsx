import { useState } from "react";
import "./App.css";
import City from "./components/City.jsx";
import ZipSearchField from "./components/ZipSearchField.jsx";

function App() {

  const [cityList, setCityList] = useState([])

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField setCityList={setCityList} />
        <br />
        <div>
          <div id="no-results" ><h6>No results Found</h6></div>
          {cityList.map((cities) => (
            <City {...cities} key={cities.RecordNumber} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
