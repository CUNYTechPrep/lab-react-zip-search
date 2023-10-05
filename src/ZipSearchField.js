import React, { useState } from "react";
import City from "./City";

export default function ZipSearchField(props) {
    const [inputValue, setInputValue] = useState('');
    const [errorMessage, setErrorMessage] = useState("No results found");
    const [cityData, setCityData] = useState([]);
  
    const handleInputChange = (event) => {
    const zipCode = event.target.value;
    setInputValue(zipCode);

    if (zipCode.length === 5) {
    fetch(`https://ctp-zip-code-api.onrender.com/zip/${zipCode}`)
        .then((response) => {
        if (!response.ok) {
            throw new Error("Invalid response from server");
        }
        return response.json();
        })
        .then((data) => {
            if (data.length > 0) {
                setCityData(data);
                setErrorMessage("");
            } else {
                setCityData([]);
                setErrorMessage("No results found");
            }
        })
        .catch((error) => {
        console.error("Error fetching data:", error);
        setCityData([]);
        setErrorMessage("No results found");
        });
    } else {
        setCityData([]);
        setErrorMessage("No results found");
        }
    };
    return (
        <div>
            <div className="my-5">
                <label className="zip-code">Zip Code: </label>
                <input className="form-control" id="zip-code" type="text" value={inputValue} onChange={handleInputChange}></input>
            </div>
            
            {errorMessage && <strong>{errorMessage}</strong>}
            {cityData.map((city, index) => (
                <City key={index} city={city} />
            ))}
        </div>
    );
}