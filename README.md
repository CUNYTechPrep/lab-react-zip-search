# React Zip Code Search Lab

In this lab you're given starter code to implement a Zip Code search app that uses an API. The final result should work like the application here: https://cunytechprep.github.io/lab-react-zip-search-solution/

- When a user types a valid zip code, the application will retrieve associated city information from an API.
- When the user types an invalid zip code the application should display `No results found`
- A complete solution will reduce unnecessary API calls

To implement this app, you're given access to a Zip Code API that you can access from your React app. [Below is a brief description of how the API works](#the-zip-and-city-search-api-documentation-ctp-zip-api).

## Mockups

Add an input field where the user can enter a zip code, like in the following image:

![Input field for searching Zip codes](zip-search-1.png)

Use the user input to [search the ctp-zip-api](#search-by-zip-code). If the zip code is valid the API will respond with an object for each city. Use that response to display each city in a separate div like in the following image:

![Display City Results](zip-search-2.png)

> NOTE: your styles (colors and look) don't have to be exact. Only functionality needs to be completed.

## To submit

- Make a fork of this repository
- Clone your own fork
- Solve the lab
  - to get started run `npm install` once to install the packages
  - to start the react app install `npm run dev`
- Commit and push your code to your forked repository
- Make a pull request back to this repository
  - Mention your Instructor and TA's names in your pull request message

## The Zip and City search API documentation (ctp-zip-api)

**API BASE URL:** https://ctp-zip-code-api.onrender.com/

Below is a description of the relevant API endpoints:

> This API has been prebuilt for this assignment.

### Search by Zip Code

- **URL**

  `/zip/:zipcode`

- **Method**

  `GET`

- **URL Params**

  **Required:**

  `zipcode=[alphanumeric]`

- **Data Params**

  None

- **Success Response**

  - **Status Code:** 200

    **Content:**

    ```JSON
    [
        {"RecordNumber":"247","Zipcode":"10018","ZipCodeType":"STANDARD","City":"NEW YORK","State":"NY","LocationType":"PRIMARY","Lat":"40.71","Long":"-73.99","Xaxis":"0.20","Yaxis":"-0.72","Zaxis":"0.65","WorldRegion":"NA","Country":"US","LocationText":"New York, NY","Location":"NA-US-NY-NEW YORK","Decommisioned":"false","TaxReturnsFiled":"4416","EstimatedPopulation":"5928","TotalWages":"810026753","Notes":""},
        { ... },
        ...
    ]
    ```

- **Error Response**

  - **Status Code:** 404

    **Content:** `Not Found`

- **Examples**

  Provide the zipcode in the url and you will receive a JSON response with an array containing an object for each city found. For example see:

  https://ctp-zip-code-api.onrender.com/zip/10016

### Search by City Name

- **URL**

  `/city/:cityname`

- **Method**

  `GET`

- **URL Params**

  **Required:**

  `cityname=[string]`

  > String must be in all uppercase letters

- **Data Params**

  None

- **Success Response**

  - **Status Code:** 200

    **Content:**

    ```JSON
    ["05343","11405","11411","11412","11413", ...]
    ```

- **Error Response**

  - **Status Code:** 404

    **Content:** `Not Found`

- **Examples**

  Provide the city name in the url and you will receive a JSON response with an array containing all zip codes for that city:

  https://ctp-zip-code-api.onrender.com/city/SPRINGFIELD
