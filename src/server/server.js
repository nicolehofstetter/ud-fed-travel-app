// Require Express to run server and routes
const express = require('express');

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
        zip: body.zip,
        startDate: body.startDate,
        endDate: body.endDate
    };
    console.log(lastTravelData);
    res.end();
});

app.get('/api/travels/latest', function (req, res) {

    res.send(lastTravelData);
});