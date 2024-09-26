function City({ cityData }) {
    return (
        <div className="card my-4">
            <div className="card-header text-center">
                <h2>{cityData.City}</h2>
            </div>
            <div className="card-body">
                <div className="row mb-3">
                    <div className="col-md-6">
                        <strong>State:</strong> {cityData.State}
                    </div>
                    <div className="col-md-6">
                        <strong>Coordinates:</strong> ({cityData.Lat}, {cityData.Long})
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <strong>Total Wages:</strong> ${cityData.TotalWages.toLocaleString()}
                    </div>
                    <div className="col-md-6">
                        <strong>Estimated Population:</strong> {cityData.EstimatedPopulation.toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default City;
