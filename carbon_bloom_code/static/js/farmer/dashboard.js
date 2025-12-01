// Load SOC Chart
function loadSOCChart(labels, values) {
    new Chart(document.getElementById("socChart"), {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "SOC (%)",
                data: values,
                borderColor: "#2E7D32",
                backgroundColor: "rgba(46,125,50,0.1)",
                borderWidth: 2,
                tension: 0.3,
                fill: true,
            }]
        }
    });
}

// File upload preview
document.addEventListener("change", function (e) {
    if (e.target.id === "file-photo") {
        alert("Photo selected. Upload logic goes here.");
    }
});
