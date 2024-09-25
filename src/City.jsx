function City({ cityData }) {
    return (
      <div className="card text-center my-4">
        <div className="card-header">
          <h2>{cityData.City}</h2>
        </div>
        <div className="card-body">
          <ul className="list-unstyled">
            <li><strong>State:</strong> {cityData.State}</li>
            <li><strong>Location:</strong> ({cityData.Lat},{cityData.Long}) </li>
            <li><strong>Total Wages:</strong> {cityData.TotalWages} </li>
            <li><strong>Population (Estimated):</strong> {cityData.EstimatedPopulation}</li>
          </ul>
        </div>
      </div>
    );
  }
  
  export default City;
  