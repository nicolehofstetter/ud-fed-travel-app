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
    }).then(() => {

    }).then((responseData) => {
        console.log(responseData);
    }).catch(() => {
        console.log('Could not post new data');
    });
}

const getCoordinatesByCity = async (city) => {
    const username = 'nicolehof';
    let url = 'http://api.geonames.org/searchJSON?username=' + username + '&formatted=true&q=' + city;
    const response = await fetch(url);
    try {
        const geonamesResponse = await response.json();
        return geonamesResponse && geonamesResponse.geonames[0];
    } catch (error) {
        console.log('Can not retrieve current weather data', error);
    }
};

function calculateTravelLength(start, end) {
    let startDate = new Date(start);
    let endDate = new Date(end);
    let period = endDate.getTime() - startDate.getTime();
    return Math.round(period / (1000 * 60 * 60 * 24));
}


const updateUiWithRecentData = async () => {
    const response = await fetch('http://localhost:8081/api/travels/latest');
    try {
        const lastTravelDate = await response.json();
        console.log(lastTravelDate);
        document.getElementById('cityOutput').innerHTML = lastTravelDate.city;
        document.getElementById('startOutput').innerHTML = lastTravelDate.startDate;
        document.getElementById('endOutput').innerHTML = lastTravelDate.endDate;
        document.getElementById('temperatureOutput').innerHTML = lastTravelDate.temperature;

        const days = calculateTravelLength(lastTravelDate.startDate, lastTravelDate.endDate);
        const countDown = calculateTravelLength(new Date().getTime(), lastTravelDate.startDate);

        document.getElementById('travelLength').innerHTML = days;
        document.getElementById('countDown').innerHTML = countDown;
        const corsImageModified = new Image();
        corsImageModified.crossOrigin = 'Anonymous';
        corsImageModified.src = lastTravelDate.imageUrl + '?not-from-cache-please';
        document.getElementById('cityImage').append(corsImageModified);

    } catch (error) {
        console.log('Can not retrieve current user response', error);
    }
};


export {saveNextTrip, updateUiWithRecentData};