import React, { useState, Fragment } from "react";
import { ZipSearchField } from "./components/ZipSearchField";
import { City } from "./components/City";
import { Header } from "./components/header/Header";
import "./App.css";

export const App = () => {
  const [zipCodeData, setZipCodeData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const zipCodeFetch = async (zipCode) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://ctp-zip-api.herokuapp.com/zip/${zipCode}`
      );

      if (!response.ok) {
        setIsLoading(false);
        setZipCodeData([]);
        throw new Error("Zip Code does not exist!");
      }

      const data = await response.json();
      setError("");
      setZipCodeData(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  const isEmpty = zipCodeData.length === 0;

  return (
    <Fragment>
      <Header />
      <ZipSearchField zipCodeFetch={zipCodeFetch} error={error} />
      <section>
        {isEmpty && <p>No Results...</p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading &&
          !isEmpty &&
          zipCodeData.map((city) => <City key={city.RecordNumber} {...city} />)}
      </section>
    </Fragment>
  );
};
