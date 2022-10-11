import React from "react";

function City({ city, state, lat, long, estimatedPopulation, totalWages }) {
    return (
      <div className="card mb-5">
        <div className="card-header">
          {city}, {state}
        </div>
        <div className="card-body">
          <ul>
            <li>State: {state}</li>
            <li>
              Location: ({lat}, {long})
            </li>
            <li>Population (estimated): {estimatedPopulation}</li>
            <li>Total Wages: {totalWages}</li>
          </ul>
        </div>
      </div>
    );
  }
  export default City
  