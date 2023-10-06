import { React, useState } from "react";
import "./App.css";

function City(props) {
  let displayedAddress = props.value;
  console.log(displayedAddress);
  return (
    <>
      {displayedAddress.map((a, index) => (
        <div className="Box">
          <div className="header">
            {a.City} , {a.State}
          </div>
          <ul key={index}>
            <li>State: {a.State}</li>
            <li>
              Location: ({a.Long},{a.Lat})
            </li>
            <li>EstimatedPopulation: {a.EstimatedPopulation}</li>
            <li>Total Wages: {a.TotalWages}</li>
          </ul>
        </div>
      ))}
    </>
  );
}

function ZipSearchField({setAddress}) {
  
  const handleSubmit = async (event) => {
    if (event.key === "Enter") {
      try {
        const fetchZipCode = await fetch(
          `https://ctp-zip-code-api.onrender.com/zip/${event.target.value}`
        );
        const data = await fetchZipCode.json();
        setAddress(data);
        // console.log(data);
        return data;
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="App">
    <div className="App-header">
      <h1>Zip Code Search</h1>
    </div>
    <div className="mx-auto" style={{ maxWidth: 400 }}>
      <div>
        <label>
          <strong>Zip Code: </strong>{" "}
        </label>
        <br />
        <input
          type="text"
          placeholder="address..."
          onKeyDown={handleSubmit}
        />
      </div>
    </div>
  </div>
)
}
function App() {
  const [address, setAddress] = useState(null);

  if (address === null) {
    return (
      <div className="App">
        <ZipSearchField setAddress={setAddress} />
      </div>
    );
  } else {
    return (
      <>
        <ZipSearchField setAddress={setAddress} />
        <City value={address} />
      </>
    );
  }
}

export default App;
