function saveNextTrip(event) {
    event.preventDefault();
    let travelData = {
        zip: document.getElementById('zip').value,
        startDate: document.getElementById('travelStartDate').value,
        endDate: document.getElementById('travelEndDate').value
    };

    fetch('http://localhost:8081/api/travels/latest', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(travelData)
    }).then((response) => {
        return response.json();
    }).then((responseData) => {
        console.log(responseData);
    }).catch(() => {
        console.log('Could not post new data');
    });
    updateUiWithRecentData();
}

const updateUiWithRecentData = async () => {
    const response = await fetch('http://localhost:8081/api/travels/latest');
    try {
        const latestTravelEntry = await response.json();
        document.getElementById('zipOutput').innerHTML = latestTravelEntry.zip;
        document.getElementById('startOutput').innerHTML = latestTravelEntry.startDate;
        document.getElementById('endOutput').innerHTML = latestTravelEntry.endDate;
    } catch (error) {
        console.log('Can not retrieve current user response', error);
    }
};


export {saveNextTrip};