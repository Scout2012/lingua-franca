// Load Charts and the corechart package.
google.charts.load('current', {'packages':['corechart']});


google.charts.setOnLoadCallback(drawlanguageChart);


google.charts.setOnLoadCallback(drawcommitChart);

// Callback that draws the pie chart for languages
function drawlanguageChart() {


  var data = new google.visualization.DataTable();
  data.addColumn('string', 'languages');
  data.addColumn('number', 'users');
  data.addRows([
    ['C++', 4],
    ['Javascript', 2],
    ['Python', 3],
    ['C#', 1],
    ['HTML', 4]
  ]);

  // Set options for language chart.
  var options = {title:'Common Programming Language',
                 width:570,
                 height:570};

  // Instantiate and draw the chart for languages.
  var chart = new google.visualization.PieChart(document.getElementById('language_chart_div'));
  chart.draw(data, options);
}


// Callback that draws the pie chart for repositories
function drawcommitChart() {

  // Create the data table for repositories
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'repositories');
  data.addColumn('number', 'commits');
  data.addRows([
    ['A', 2],
    ['B', 2],
    ['C', 2],
    ['D', 0],
    ['D', 3]
  ]);

  // Set options for repositories pie chart.
  var options = {title:'Who has more commits?',
                 width:570,
                 height:570};

  // Instantiate and draw the chart for repositories
  var chart = new google.visualization.PieChart(document.getElementById('repo_chart_div'));
  chart.draw(data, options);
}
