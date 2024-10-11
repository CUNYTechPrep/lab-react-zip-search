import { useEffect, useState } from 'react';
import "./App.css";

function City(props) {
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

function ZipSearchField({setCitydata, SetMessage}) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (query.length === 5) {
        try {
          const response = await fetch(`https://ctp-zip-code-api.onrender.com/zip/${query}`)
          const data = await response.json()
          if (data) {
            setCitydata(data)
            SetMessage('')
          }
        } catch (error) {
          SetMessage('Error fetching city data', error)
          setCitydata([])
        }
      } else {
        SetMessage('No results found')
        setCitydata([])
      }
    }
    fetchData()
  }, [query, setCitydata, SetMessage])
  
  return (
    <>
      <label>
        Zip Code:
        <input value={query} onChange={e => setQuery(e.target.value)} />
      </label>
      
    </>
  );
}

function App() {
  const [cityData, setCitydata] = useState([]);
  const [message, SetMessage] = useState('No results found')
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField setCitydata={setCitydata} SetMessage={SetMessage} />
        <div>{message}</div>
        <div>
          {cityData.map((city) => {
            console.log(city)
            return <City key={city.RecordNumber} {...city} />
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
