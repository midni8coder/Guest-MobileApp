function getGuestOccupencyData(){
    return [
        { y: 300, label: "Jan" },
        { y: 312, label: "Feb" },
        { y: 330, label: "Mar" },
        { y: 240, label: "Apr" },
        { y: 342, label: "May" }
    ];
}
function getExpenditureData()
{
    return [
        { y: 30000, label: "Vegetables" },
        { y: 15000, label: "Rice" },
        { y: 5000, label: "Water" },
        { y: 8000, label: "Non-Veg" },
        { y: 3000, label: "Others" }
    ];
}

function showChart(chartType, containerID, headerText, DataPreparationFunction){
    var chart = new CanvasJS.Chart(containerID, {
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text:headerText
        },
        data: [{
            type: chartType,
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}",
            dataPoints: window[DataPreparationFunction]()
        }]
    });
    chart.render();
    $('.canvasjs-chart-toolbar').hide();
    $('.canvasjs-chart-credit').hide();
}