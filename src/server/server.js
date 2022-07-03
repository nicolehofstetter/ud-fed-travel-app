// Require Express to run server and routes
const express = require('express');
var fetch = require('node-fetch');

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

    fetch('https://api.weatherbit.io/v2.0/current?lat='
        + lastTravelData.latitude + '&lon='
        + lastTravelData.longitude + '&key=2fe964d0766f4a13a50b57a1d18ef248')
        .then((response) => {
            return response.json();
        }).then((responseData) => {
            lastTravelData.temperature = responseData.data[0].temp;
            console.log(responseData.data[0]);
            console.log(lastTravelData);
        }).catch(() => {
            console.log('Could not post new data');
        });
    res.end();
});

app.get('/api/travels/latest', function (req, res) {
    fetch('https://pixabay.com/api/?key=28287041-ec797974fc8b385c545365dc4&q=' + lastTravelData.city)
        .then((response) => {
            return response.json();
        }).then((responseData) => {
            lastTravelData.imageUrl = responseData.hits[0].webformatURL;

            console.log('response');
            console.log(lastTravelData);
            res.send(lastTravelData);
        }).catch(() => {
            console.log('Could not post new data');
        });

});

