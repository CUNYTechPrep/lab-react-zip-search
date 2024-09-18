export default function ZipSearchField(props) {

    const zipcodeApi = async (zipcode) => {
        // put try catch block here
        // API_BASE_URL specifies the API Base URL
        const API_BASE_URL = "https://ctp-zip-code-api.onrender.com";
        //try block to test if api call gives valid response or error
        try{
            // using a concatonated string to create the APU URL and then use fetch to call the API
            const response = await fetch(API_BASE_URL + "/zip/" + zipcode);
            // var body will store the reponses
            const body = await response.json();   
            // we passed the setCityList function so we can call the prop function to set the city list
            props.setCityList(body);
            // if an error is caught change the cityList to an empty array and show the "results not found text"
        }catch(error){
            document.getElementById("no-results").style.display = "block";
            props.setCityList([]);
        }
       
    }

    // this function will handle the input each time the input changes in the ZipSearchField
    const handleChange = (event) => {
        // Store the value of the event in var value
        const value = event.target.value;
        // We only need to call the Api if the length is 5
        if (value.length == 5) {
            //hide the text "results not found" when calling the api
            document.getElementById("no-results").style.display = "none";
            // call the zipcode api
            zipcodeApi(value);
        } else {
            // if the value is not equal to length 5 then we display nothing
            props.setCityList([]);
            // display the text "results not found"
            document.getElementById("no-results").style.display = "block";
        }
    };

    return <div>
        <p>Zipcode:</p>
        <input
            // put a place holder value for users to try  
            placeholder="Try 10016"
            // every time the state is changed the function handleChange should be updated
            onChange={handleChange}
        />
    </div>;
}