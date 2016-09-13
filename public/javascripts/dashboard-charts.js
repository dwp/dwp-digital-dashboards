$(function(){
  google.charts.load('visualization','1', {packages: ['corechart','line']});
  google.charts.setOnLoadCallback(runQueries);

  function runQueries() {
    var spreadsheetKey = "19Uc0FgtNDp9EfFhiHZJHG0ax8ZCtdvxSkbZryiOxSKo&gid=1690305366";

    var getLineChartData = new google.visualization.Query('http://spreadsheets.google.com/tq?key='+spreadsheetKey);
    getLineChartData.setQuery("SELECT A,B,C ");
    getLineChartData.send(drawLineChart);

    var getDeviceUsage = new google.visualization.Query('http://spreadsheets.google.com/tq?key='+spreadsheetKey+'&range=R3:S5');
    getDeviceUsage.send(drawDeviceUsage);

    var getTotalUsers = new google.visualization.Query('http://spreadsheets.google.com/tq?key='+spreadsheetKey+'&range=D3:F3');
    getTotalUsers.send(drawTotalUsers);

    var getTotalSessions = new google.visualization.Query('http://spreadsheets.google.com/tq?key='+spreadsheetKey+'&range=D10:F10');
    getTotalSessions.send(drawTotalSessions);
  }

  function drawLineChart(response) {
    var getChartData = response.getDataTable(),
        chartData    = [['Date', 'Users', 'Sessions']];

    for (i=0; i<getChartData.getNumberOfRows(); i++) {
      var getDate          = new Date(getChartData.getValue(i, 0)),
          users            = getChartData.getValue(i, 1)
          sessions         = getChartData.getValue(i, 2),
          formattedDate    = getDate.getDate() + '-' + (getDate.getMonth() + 1),
          chartData[i + 1] = [formattedDate, users, sessions];
    }

    var data = google.visualization.arrayToDataTable(chartData),
        options = {
          colors   : ['#96C4E4', '#FFBF47'],
          legend   : { position: 'top' },
          hAxis: {
            showTextEvery: 2,
            textStyle: {
             fontSize: 14,
             fontName: 'Noto+Sans',
           }
          },
        },
        chart = new google.visualization.LineChart(document.getElementById('line-chart'));

    chart.draw(data, options);

  }

  function drawDeviceUsage(response) {
    var getChartData = response.getDataTable(),
        chartData    = [['','']];

    for (i=0; i<getChartData.getNumberOfRows(); i++) {
      chartData[i + 1] = [getChartData.getValue(i, 0), getChartData.getValue(i, 1)];
    }
    //console.log(chartData);

    var data = google.visualization.arrayToDataTable(chartData),
        options = {
          colors: ['#93D0CB','#2B88C8','#96C4E4','#FFBF47','#28A197'],
          height : 250
        },
        chart = new google.visualization.PieChart(document.getElementById('device-usage-chart'));

    chart.draw(data, options);
  }

  function drawStats(container,data) {
    var getData         = data.getDataTable(),
        total2b         = getData.getValue(0,0),
        total21         = getData.getValue(0,1),
        totalDifference = (total21-total2b),
        arrow           = totalDifference > 0 ? 'increase' : 'decrease',
        change          = ((getData.getValue(0,2)*100).toFixed(2));

        if (totalDifference % 1 != 0) {
          totalDifference = totalDifference.toFixed(2)
        }

        if (total21 % 1 != 0) {
          total21 = total21.toFixed(2)
        }

    $('#' + container).append('<h3 class="heading-xlarge">' + total21 + '</h3>'+
      '<p>(' + totalDifference + ')<span class="' + arrow + '"></span>' + change + '% ' + arrow + '</p>');
  }

  function drawTotalUsers(response) {
    drawStats('stat-1',response)
  };

  function drawTotalSessions(response) {
    drawStats('stat-2',response)
  };
})
