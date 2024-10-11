import { useEffect, useState } from 'react';
import "./App.css";

function Location(props) {
  console.log(props.State)
  return <div className='city'>
    <div className='city-header'>{props.LocationText}</div>
    <ul className='city-body'>
      <li>State: {props.State}</li>
      <li>Location: {props.Lat}, {props.Long}</li>
      <li>Population (estimated): {props.EstimatedPopulation}</li>
      <li>Total Wages: {props.TotalWages}</li>
    </ul>
  </div>;
}

function ZipSearchInput({setLocationData, displayMessage}) {
  const [zipCode, setZipCode] = useState('');

  useEffect(() => {
    const retrieveData = async () => {
      if (zipCode.length === 5) {
        try {
          const response = await fetch(`https://ctp-zip-code-api.onrender.com/zip/${zipCode}`)
          const data = await response.json()
          if (data) {
            setLocationData(data)
            displayMessage('')
          }
        } catch (error) {
          displayMessage('Error fetching location data', error)
          setLocationData([])
        }
      } else {
        displayMessage('No results found')
        setLocationData([])
      }
    }
    retrieveData()
  }, [zipCode, setLocationData, displayMessage])

  return (
    <>
      <label>
        Zip Code:
        <input value={zipCode} onChange={e => setZipCode(e.target.value)} />
      </label>
    </>
  );
}

function App() {
  const [locationData, setLocationData] = useState([]);
  const [alertMessage, displayMessage] = useState('No results found');
  
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchInput setLocationData={setLocationData} displayMessage={displayMessage} />
        <div>{alertMessage}</div>
        <div>
          {locationData.map((location) => {
            console.log(location)
            return <Location key={location.RecordNumber} {...location} />
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
