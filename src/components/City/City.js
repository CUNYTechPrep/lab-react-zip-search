import React from "react";

export default function City({ cityInfo }) {
  return (
    <div>
      <p>{cityInfo.City}, {cityInfo.State}</p>
      <ul>
        <li>State: {cityInfo.State}</li>
        <li>Population: {cityInfo.EstimatedPopulation}</li>
        <li>Total Wages: ${cityInfo.TotalWages}</li>
        <li>Coordinates: ({cityInfo.Xaxis},{cityInfo.Yaxis} ,{cityInfo.Zaxis})</li>
      </ul>
    </div>
  );
}
