$(function(){
  google.charts.load('visualization','1', {packages: ['corechart','line']});
  google.charts.setOnLoadCallback(runQueries);

  function deviceUsage(data) {
    var queryJson = getChartData(data),
        chartData = [['','']];

    for (i=0; i<queryJson.table.rows.length; i++) {
      var val1 = queryJson.table.rows[i].c[0].v,
          val2 = queryJson.table.rows[i].c[1].v;
      chartData.push([val1,val2]);
    }

    var data = google.visualization.arrayToDataTable(chartData),
        options = {
          colors: ['#93D0CB','#2B88C8','#96C4E4','#FFBF47','#28A197'],
          height : 250
        },
        chart = new google.visualization.PieChart(document.getElementById('device-usage-chart'));

    chart.draw(data, options);
  }

  function sessionAndUsers(data) {
    var queryJson = getChartData(data),
        chartData = [['Date', 'Users', 'Sessions']];

    for (var i=1; i<queryJson.table.rows.length; i++) {
      if (queryJson.table.rows[i].c[0]) {
        var getDate          = new Date(queryJson.table.rows[i].c[0].f),
            formattedDate    = getDate.getDate() + '-' + (getDate.getMonth() + 1),
            users            = parseFloat(queryJson.table.rows[i].c[1].f),
            sessions         = parseFloat(queryJson.table.rows[i].c[2].f);
            chartData.push([formattedDate, users, sessions]);
        }
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

  function runQueries() {
    $.ajax({
      url: '../piptest-yannis/piptest-query.php?query=sessionAndUsers',
        success:function(data) {
          sessionAndUsers(data);
       }
     });

     $.ajax({
       url : '../piptest-yannis/piptest-query.php?query=deviceUsage',
         success:function(data) {
           deviceUsage(data);
        }
     });

     $.ajax({
       url : '../piptest-yannis/piptest-query.php?query=totalUsers',
         success:function(data) {
          drawStats('total-users',data);
        }
     });

     $.ajax({
       url : '../piptest-yannis/piptest-query.php?query=totalSessions',
         success:function(data) {
          drawStats('total-sessions',data);
        }
     });
   }

});
