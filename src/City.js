import React from "react";
import CityCard from "./CityCard.js";

function City(zipFetch) {
  if (zipFetch === "Not Found") {
    return <h6>No Results</h6>;
  }

  return (
    <>
      {zipFetch.map((option) => (
        <CityCard
          key={option}
          location={option.LocationText}
          recordNum={option.RecordNumber}
          state={option.State}
          lat={option.Lat}
          long={option.Long}
          population={option.EstimatedPopulation}
          wages={option.TotalWages}
        />
      ))}
    </>
  );
}

export default City;
