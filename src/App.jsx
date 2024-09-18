import { useState } from "react";
import "./App.css";
import City from "./components/City.jsx";
import ZipSearchField from "./components/ZipSearchField.jsx";

function App() {

  //creating states to store the city list
  //I want the application to rerender everytime the state of the City List changes
  const [cityList, setCityList] = useState([])

  
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        {/* ZipSearchField is modified to be able to edit the city list. It wont need to access it */}
        <ZipSearchField setCityList={setCityList} />
        <br />
        <div className="results">
          {/* this div will display the results of the zipsearch and Api call */}
          <div id="no-results" ><h6>No Results Found</h6></div>
          {/* the code below will create a City component for every item in cityList array */}
          {cityList.map((cities) => (
            // calls the city component, pass each city to it, and uses the record number as the key so they aren't rerendered
            <City {...cities} key={cities.RecordNumber} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
