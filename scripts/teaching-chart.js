// Load google charts
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

// Draw the chart and set the chart values
function drawChart() {
  var data = google.visualization.arrayToDataTable([
  ['Course', 'Number of Times Taught'],
  ['Physical Science (PSC1121)', 2],
  ['Physics 1 for Scientists and Engineers (PHY2048)', 2],
  ['Physics 2 for Scientists and Engineers (PHY2049)', 3],
  ['College Physics 1 Lab and Recitation (PHY2053C)', 2],
  ['College Physics 2 (PHY2054)', 1]
]);

  // Optional; add a title and set the width and height of the chart
  var options = {'title':'Teaching Assistant Experience',
                 'width':550, 'height':400};

  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.ColumnChart(document.getElementById('barchart'));
  chart.draw(data, options);
}
