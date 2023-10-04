import { React, useState, useEffect, useRef } from "react";
import "./App.css";
//useEffect allow's us to code in a impure enviroment. A impure enviroment is a enviroment or function whose behavior maybe unknown, such as fetching data from a API
//A static function with a static return type is a example of a pur enviroment

const City = (props) => {
  //Store data
  const [zipdata, setData] = useState([]);

  //Fetch data
  useEffect(() => {
    const searchZip = async () => {
      try {
        const response = await fetch(`https://ctp-zip-code-api.onrender.com/zip/${props.zip}`)
        const data = await response.json();
        console.log(data)
        setData(data);//get the data and store it in a useState
      }
      catch (error) {
        setData([]);//sets the data to empty 
        console.log("Invaild Zip Code", error)
      }
    }
    searchZip();
  }, [props.zip]);//the array specifcs that when the zip is changed, make a new request

  return (
    <div>
      {zipdata.length > 0 ? (
        <div className="vaild-zip-container">
          {
            zipdata.map((zip_object) => ( //the map function traverse through a iterable and applys a function over it; this case traverse
              <div className="zip-info">{/*through the array of objects and display the information we want at each index*/}
                <div className="city-container-block">
                  {zip_object.City}, {zip_object.State}
                </div>
                <ul>
                  <li className="list-item">
                    State: {zip_object.State}
                  </li>
                  <li className="list-item">
                    Location: {zip_object.Lat} {zip_object.Long}
                  </li>
                  <li className="list-item">
                    Population (estimated): {zip_object.EstimatedPopulation}
                  </li>
                  <li className="wage-container">
                    Total Wages: {zip_object.TotalWages}
                  </li>
                  </ul>
              </div>
            ))
          }
        </div>
      ) : (
        <div className="invaild-zip-container">
          <h3>No results found</h3>
        </div>
      )}
    </div>
  );
}

const ZipSearchField = (props) => {
  const [zipcode, setZipcode] = useState("");

  const handleInputChange = (event) => {
    setZipcode(event.target.value);
  };//stores the zip code entered into state

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    props.zipPassed(zipcode);
  };//when the form is submitted, only then will it be forwarded down to the city function, and we prevent the page from reloading

  return (
    <div>
      <div className="field-text">
        <p>Zip Code:</p>
      </div>
      <div className="search-field">
        <form onSubmit={handleSubmit}>
          <input maxLength={5} value={zipcode} onChange={handleInputChange} />
        </form>
      </div>
    </div>
  );
  /*
  Have two event handler:
  1. For when data is entered in the text-input field, we use a state to keep track of the input on change
  2. For when the data is submitted, only then do we want to forward it down to the city component to do the querying and fetching
  */
};

function App() {
  const [zenter, setZipEntered] = useState("");

  const handleZipChange = (z) => {
    setZipEntered(z);
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField zipPassed={handleZipChange} />
        <div>
          <City zip={zenter} />
        </div>
      </div>
    </div>
  );
}

export default App;
