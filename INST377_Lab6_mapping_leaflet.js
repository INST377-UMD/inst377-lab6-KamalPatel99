function createMap() {
    var map = L.map('map').setView([38.99, -76.94], 5);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    let markers = [];
    for (let i = 1; i <= 3; i++) {
        const lat = getRandomInRange(30, 35, 3);
        const lon = getRandomInRange(-90, -100, 3);

        var marker = L.marker([lat, lon]).addTo(map);
        markers.push({lat, lon, marker });

        document.getElementById(`marker${i}-coords`).innerText = `Latitude: ${lat}, Longitude: ${lon}`;

        fetchLocality(lat, lon, i);

    }

}

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
    }

function fetchLocality(lat, lon, markerNumber) {
    const apiURL = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const locality = data.locality || 'Unknown';
            document.getElementById(`marker${markerNumber}-locality`).innerText = locality;
        })

        .catch(error => {
            console.error('Error fetching locality data:', error);
            document.getElementById(`marker${markerNumber}-locality`).innerText = 'Error retrieving locality';
        });
}



window.onload = createMap();