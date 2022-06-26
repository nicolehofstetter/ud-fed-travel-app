function saveNextTrip() {
    let travelData = {
        zip: document.getElementById('zip').value,
        startDate: document.getElementById('travelStartDate').value,
        endDate: document.getElementById('travelEndDate').value
    };

    fetch('localhost:8081/api/travels/latest', {
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

}


export {saveNextTrip};