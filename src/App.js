import React, { useState, useEffect } from "react";
import "./App.css";

function City({cityInfo}) {
   // return <div>This is the ZipSearchField component</div>;
   return (
    <div>
      <h2>City Information</h2>
      <p>City: {cityInfo.City}</p>
      <p>State: {cityInfo.State}</p>
      {/* Add more information fields as needed */}
    </div>
  );
}

function ZipSearchField({onZipChange}) {
  const [zipCode, setZipCode] = useState("");

  const handleZipChange = (e) => {
    const value = e.target.value;
    setZipCode(value);
    onZipChange(value);
  };

  //return <div>This is the City component</div>;
  return (
    <div>
      <input
        type="text"
        placeholder="Enter Zip Code"
        value={zipCode}
        onChange={handleZipChange}
      />
    </div>
  );
}

function App() {
  const [zipCode, setZipCode] = useState("");
  const [cityInfo, setCityInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (zipCode.length === 5) {
      // Make an API call to get city information when zip code is valid
      fetch(`https://ctp-zip-code-api.onrender.com/zip/${zipCode}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Invalid Zip Code");
          }
          return response.json();
        })
        .then((data) => {
          // Assuming the API returns an array of city info, you can choose the first result
          if (data && data.length > 0) {
            setCityInfo(data[0]);
            setError(null);
          } else {
            setError("No results found");
            setCityInfo(null);
          }
        })
        .catch((error) => {
          setError(error.message);
          setCityInfo(null);
        });
    } else {
      // Clear city information when zip code is not valid
      setCityInfo(null);
      setError(null);
    }
  }, [zipCode]);

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField onZipChange={setZipCode} />
        {error ? <div>{error}</div> : null}
        {cityInfo ? <City cityInfo={cityInfo} /> : null}
      </div>
    </div>
  );

  // return (
  //   <div className="App">
  //     <div className="App-header">
  //       <h1>Zip Code Search</h1>
  //     </div>
  //     <div className="mx-auto" style={{ maxWidth: 400 }}>
  //       <ZipSearchField />
  //       <div>
  //         <City />
  //         <City />
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default App;
