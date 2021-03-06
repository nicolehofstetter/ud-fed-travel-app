import {updateUiWithRecentData} from './updateUi';

// This method fetches the coordinates of given city using the geonames api
async function getCoordinatesByCity(city) {
    const username = 'nicolehof';
    let url = 'http://api.geonames.org/searchJSON?username=' + username + '&formatted=true&q=' + city;
    const response = await fetch(url);
    try {
        const geonamesResponse = await response.json();
        return geonamesResponse && geonamesResponse.geonames[0];
    } catch (error) {
        console.log('Can not retrieve current weather data', error);
    }
}

// This method posts the details of the next trip to the server.
// It includes input data of the user: city, startDate and endDate
// and combines it with the coordinates and country given from the geonames api
async function saveNextTrip(event) {
    event.preventDefault();

    let city = document.getElementById('city').value;
    let startDate = document.getElementById('travelStartDate').value;
    let endDate = document.getElementById('travelEndDate').value;

    let coordinatesByZip = await getCoordinatesByCity(city);

    const coordinates = {
        latitude: coordinatesByZip.lat,
        longitude: coordinatesByZip.lng,
        country: coordinatesByZip.countryName,
        startDate: startDate,
        endDate: endDate,
        city: city,
    };

    fetch('http://localhost:8081/api/travels/latest', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(coordinates)
    }).then(async () => {
        await updateUiWithRecentData();
    }).catch(() => {
        console.log('Could not post new data');
    });
}

export {saveNextTrip};