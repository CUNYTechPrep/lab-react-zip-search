import React, {useState} from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [zipCode, setZipCode] = useState('');

  const fetchData = () => {
    fetch('https://ctp-zip-api.herokuapp.com/zip/' + zipCode , {
    'mode' : 'cors',
    headers: {
      'Content-Type' : 'application/json',
    }
    })
    .then((response) => response.json())
    .then((responseData) => setData(responseData))
    .catch((error) => (console.log("NO RESULTS FOUND FOR " + zipCode)) & (
        document.getElementById("the-result").innerHTML = `<b>No results found</b>`,
        document.getElementById("everything").hidden = true
      )
    )
  }
  
  return (
  <div className="App">
    <div className="App-header">
      <h1>Zip Code Search</h1>
    </div>
    <br></br>

    <div className="container">
      <div className="row">
        <div style={{marginTop: 20}}>
          <div className="Main-box d-flex justify-content-center">
            <form>
              <label>Zip Code:</label>
              <input type="text" onChange={(e) => setZipCode(e.target.value)} className="rounded" required pattern="[0-9]+"></input>
            </form>
          </div>

          <div className="Main-box d-flex justify-content-center mt-1">
            <button onClick={() => fetchData(zipCode)}>Search</button>
          </div>

          <pre className="Main-box d-flex justify-content-center mt-5" id="the-result"><b>No results found</b></pre>

          <br></br>
          
          <div id="everything">
            {data.map((zip) => {
                return(
                  document.getElementById("the-result").innerHTML = `<b>${data[0].Zipcode}</b>`,
                  document.getElementById("everything").hidden = false,
                  <div>
                    <div className="row">
                      <div className="Main-box col-1 bg-light border border-dark rounded-top w-100">
                        <pre id="city-section">{zip.City}</pre>
                      </div>
                      <div className="col-1 bg-primary border border-dark rounded-bottom w-100 text-white mb-3">
                        <ul className="list-styled" id="the-info">
                          <li className="justify-content-left" id="under-city"><pre>State: {zip.State}</pre></li>
                          <li className="justify-content-left"><pre id="under-city">Location: ({zip.Lat}, {zip.Long})</pre></li>
                          <li className="justify-content-left"><pre id="under-city">Population (estimated): {zip.EstimatedPopulation}</pre></li>
                          <li className="justify-content-left"><pre id="under-city">Total Wages: {zip.TotalWages}</pre></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
            




            
            
        </div>
      </div>
    </div>
  </div>
  ) 
}

export default App;