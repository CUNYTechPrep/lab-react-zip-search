//pay attention to the semantics of the names, it will give insight into how things work
export default function ZipSearchField(props) {

    // const [cityList,setCityList]=useState([])
    // const zipcode ="";
    const zipcodeApi = async (zipcode) => {
        // console.log("Inside Async function")
        const API_BASE_URL = "https://ctp-zip-code-api.onrender.com";
        const response = await fetch(API_BASE_URL + "/zip/" + zipcode);
        const body = await response.json();

        // console.log(body);
        //Why does the following line cause the function to call itself infinitely
        props.setCityList(body);

    }

    //look into ref
    //Should this code below be the app function or in this function
    //I am guessing the app function so it can pass the value as a prop

    //using states will cause the app to re render

    var changed = false;
    const handleChange = (event) => {
        const value = event.target.value;
        if (value.length == 5) {
            document.getElementById("no-results").style.display = "none";
            zipcodeApi(value);
            changed = false;
        } else {
            props.setCityList([]);
            document.getElementById("no-results").style.display = "block";


        }
    };
    //this statement is causing the zipcode to rerender everytime the function is run

    return <div>
        <p>Zipcode:</p>
        <input
            onChange={handleChange}
        />
    </div>;
}