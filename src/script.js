<div className="mx-auto" style={{ maxWidth: 400 }}>

    
</div>
function searchByZipCode() {
    const zipCode = document.getElementById('zipCode').value;
    fetch(`https://ctp-zip-code-api.onrender.com/zip/10016${zipCode}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Zip code not found');
            }
        })
        .then(data => {
            displayResult(data);
        })
        .catch(error => {
            displayError(error);
        });
}

function searchByCity() {
    const cityName = document.getElementById('cityName').value;
    fetch(`https://ctp-zip-code-api.onrender.com/city/SPRINGFIELD${cityName}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('City not found');
            }
        })
        .then(data => {
            displayResult(data);
        })
        .catch(error => {
            displayError(error);
        });
}

function displayResult(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = JSON.stringify(data, null, 2);
}

function displayError(error) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<div style="color: red;">Error: ${error.message}</div>`;
}

