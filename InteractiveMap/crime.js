const params = new URLSearchParams(window.location.search);
const area = params.get("area");

document.getElementById("title").innerText = area + " Crime Breakdown";

const crimeData = {
    Camden: [30, 20, 15, 10],
    Greenwich: [15, 10, 8, 5],
    Hackney: [25, 20, 15, 10],
    Westminster: [40, 30, 20, 15],
    Croydon: [20, 15, 10, 5]
};

const labels = ["Theft", "Violence", "Burglary", "Other"];

const ctx = document.getElementById('crimeChart');

new Chart(ctx, {
    type: 'pie',
    data: {
        labels: labels,
        datasets: [{
            data: crimeData[area] || [10,10,10,10]
        }]
    }
});
