import React from "react";

export default function City({city}) {
    return (
        <div className="card mb-5">
            <div className="card-header">{city.City}, {city.State}</div>
            <div className="card-body">
                <ul>
                    <li>State: {city.State}</li>
                    <li>Location: ({city.Lat}, {city.Long})</li>
                    <li>Population (estimated): {city.EstimatedPopulation}</li>
                    <li>Total Wages: {city.TotalWages}</li>
                </ul>
            </div>
        </div>
    );
}