import React from "react";

const City = (props) => {
  return (
    <div>
      <h1>{props.city.City}</h1>
      <ul>
        <li>State: {props.city.State}</li>
        <li>
          Location: ({props.city.Lat}, {props.city.Long})
        </li>
        <li>Population (estimated): {props.city.EstimatedPopulation}</li>
        <li>Total Wages: {props.city.TotalWages}</li>
      </ul>
    </div>
  );
};

export default City;
