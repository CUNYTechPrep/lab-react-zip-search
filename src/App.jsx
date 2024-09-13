import { useEffect, useState } from "react";
import "./App.css";

function City(props) {
  return (
    <div className="city">
      <h2> {props.city.locationText} </h2>
      <ul>
        <li>State: {props.city.state}</li>
        <li>
          Location: ({props.city.lat}, {props.city.long})
        </li>
        <li>Population(estamated): {props.city.population}</li>
        <li>Total Wages: {props.city.wages}</li>
      </ul>
    </div>
  );
}

function ZipSearchField(props) {
  return (
    <div className="searchBox">
      Zip Code:{" "}
      <input
        type="text"
        value={props.zipcode}
        name="zipcode"
        onChange={props.handleChange}
      />
    </div>
  );
}

let cities = [];

function App() {
  const [zipcode, setZipcode] = useState("10012");
  const [city, setCity] = useState({
    locationText: "",
    state: "",
    lat: "",
    long: "",
    population: "",
    wages: "",
  });

  const handleChange = (e) => {
    setZipcode(e.target.value);
  };

  useEffect(() => {
    const getZipcode = async () => {
      const zipRes = await fetch(
        `https://ctp-zip-code-api.onrender.com/zip/${zipcode}`
      );
      const zipDatas = await zipRes.json();
      console.log(zipDatas);

      cities = [];

      for (let i = 0; i < zipDatas.length; i++) {
        const newCity = {
          locationText: zipDatas[i].LocationText,
          state: zipDatas[i].State,
          lat: zipDatas[i].Lat,
          long: zipDatas[i].Long,
          population: zipDatas[i].EstimatedPopulation,
          wages: zipDatas[i].TotalWages,
        };

        // setCity({
        //   locationText: zipDatas[i].LocationText,
        //   state: zipDatas[i].State,
        //   lat: zipDatas[i].Lat,
        //   long: zipDatas[i].Long,
        //   population: zipDatas[i].EstimatedPopulation,
        //   wages: zipDatas[i].TotalWages,
        // });

        setCity({ ...newCity });
        cities.push(<City city={newCity} key={i} />);
      }
    };
    getZipcode();
  }, [zipcode]);

  console.log(cities);

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField zipcode={zipcode} handleChange={handleChange} />
        <div>{zipcode.length === 5 ? cities : "No results found"}</div>
      </div>
    </div>
  );
}

export default App;
