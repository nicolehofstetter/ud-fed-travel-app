function calculateDaysBetweenTwoDays(start, end) {
    let startDate = new Date(start);
    let endDate = new Date(end);
    let period = endDate.getTime() - startDate.getTime();
    return Math.round(period / (1000 * 60 * 60 * 24));
}

async function updateUiWithRecentData() {
    const response = await fetch('http://localhost:8081/api/travels/latest');
    try {
        const lastTravelDate = await response.json();
        document.getElementById('cityOutput').innerHTML = lastTravelDate.city;
        document.getElementById('country').innerHTML = lastTravelDate.country;
        document.getElementById('startOutput').innerHTML = lastTravelDate.startDate;
        document.getElementById('endOutput').innerHTML = lastTravelDate.endDate;
        document.getElementById('temperatureOutput').innerHTML = lastTravelDate.temperature;

        const days = calculateDaysBetweenTwoDays(lastTravelDate.startDate, lastTravelDate.endDate);
        const countDown = calculateDaysBetweenTwoDays(new Date().getTime(), lastTravelDate.startDate);

        document.getElementById('travelLength').innerHTML = days;
        document.getElementById('countDown').innerHTML = countDown;

        const corsImageModified = new Image();
        corsImageModified.crossOrigin = 'Anonymous';
        corsImageModified.src = lastTravelDate.imageUrl + '?not-from-cache-please';
        document.getElementById('cityImage').append(corsImageModified);

    } catch (error) {
        console.log('Can not retrieve current user response', error);
    }
}

export {updateUiWithRecentData, calculateDaysBetweenTwoDays};