const express = require('express');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));


// Setup Server
app.listen(8081, function () {
    console.log('Server is running on port 8081');
});

let lastTravelData = {};

function getImageUrl() {
    let apiKey = process.env.PIXABAY_API_KEY;
    return fetch('https://pixabay.com/api/?key=' + apiKey + '&q=' + lastTravelData.city)
        .then((response) => {
            return response.json();
        }).then((responseData) => {
            return responseData.hits[0].webformatURL;

        }).catch(() => {
            console.log('Could not post new data');
        });
}

function getTemperature() {
    let apiKey = process.env.WEATHER_BIT_API_KEY;
    return fetch('https://api.weatherbit.io/v2.0/current?lat='
        + lastTravelData.latitude + '&lon='
        + lastTravelData.longitude + '&key=' + apiKey)
        .then((response) => {
            return response.json();
        }).then((responseData) => {
            console.log(lastTravelData);
            return responseData.data[0].temp;
        }).catch(() => {
            console.log('Could not post new data');
        });
}

// Save requested data including current temperature
app.post('/api/travels/latest', function (req, res) {
    let body = req.body;
    lastTravelData = {
        longitude: body.longitude,
        latitude: body.latitude,
        country: body.country,
        startDate: body.startDate,
        endDate: body.endDate,
        temperature: 0,
        imageUrl: '',
        city: body.city
    };
    getTemperature().then((temp) => {
        lastTravelData.temperature = temp;
    });

    getImageUrl().then((imageUrl) => {
        lastTravelData.imageUrl = imageUrl;
    });

    res.end();
});

app.get('/api/travels/latest', function (req, res) {
    res.send(lastTravelData);
});

export {getTemperature};
