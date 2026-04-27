var map = L.map('map').setView([51.505, -0.09], 11);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);

var markers = [];

var data = [
    {
        name: "Camden",
        lat: 51.545,
        lng: -0.162,
        intensity: 75,
        population: "270,000",
        weather: "Cloudy, 15°C",
        factors: [
            "High population density",
            "Strong cultural / commercial activity",
            "Moderate weather conditions"
        ]
    },
    {
        name: "Greenwich",
        lat: 51.482,
        lng: 0.005,
        intensity: 38,
        population: "290,000",
        weather: "Sunny, 17°C",
        factors: [
            "Lower congestion compared to central London",
            "More green space",
            "Stable environmental conditions"
        ]
    },
    {
        name: "Hackney",
        lat: 51.545,
        lng: -0.055,
        intensity: 62,
        population: "280,000",
        weather: "Rainy, 14°C",
        factors: [
            "Moderate–high density residential area",
            "Mixed commercial/residential usage",
            "Variable weather conditions"
        ]
    },
    {
        name: "Westminster",
        lat: 51.497,
        lng: -0.137,
        intensity: 88,
        population: "260,000",
        weather: "Cloudy, 16°C",
        factors: [
            "Very high visitor and commuter density",
            "Major administrative and tourism centre",
            "High urban activity levels"
        ]
    },
    {
        name: "Croydon",
        lat: 51.376,
        lng: -0.098,
        intensity: 32,
        population: "390,000",
        weather: "Windy, 13°C",
        factors: [
            "Lower central congestion",
            "Residential-heavy environment",
            "More spatial availability"
        ]
    }
];

function getColor(value) {
    if (value > 70) return "red";
    if (value > 40) return "orange";
    return "green";
}

function getInterpretation(value) {
    if (value > 70) return "High urban intensity";
    if (value > 40) return "Moderate urban intensity";
    return "Low urban intensity";
}

function formatFactors(list) {
    return "<ul>" + list.map(i => "<li>" + i + "</li>").join("") + "</ul>";
}


function createMarkers(filter = "all") {

    markers.forEach(m => map.removeLayer(m));
    markers = [];

    data.forEach(function(point) {

        let category = "low";
        if (point.intensity > 70) category = "high";
        else if (point.intensity > 40) category = "medium";

        if (filter !== "all" && filter !== category) return;

        var circle = L.circle([point.lat, point.lng], {
            color: getColor(point.intensity),
            fillColor: getColor(point.intensity),
            fillOpacity: 0.6,
            radius: 500
        }).addTo(map);

        circle.bindPopup(
            "<h3>" + point.name + "</h3>" +
            "<b>Population:</b> " + point.population + "<br>" +
            "<b>Weather:</b> " + point.weather + "<br>" +
            "<b>Intensity Score:</b> " + point.intensity + "<br>" +
            "<b>Classification:</b> " + getInterpretation(point.intensity) + "<br><br>" +
            "<b>Contributing Factors:</b>" +
            formatFactors(point.factors)
        );

        markers.push(circle);
    });
}

function filterData(level) {
    createMarkers(level);
}

function showAll() {
    createMarkers("all");
}

createMarkers();
