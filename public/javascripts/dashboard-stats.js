$(function(){


    var JSONURL2 = '/test.php';
    $.ajax({
                url: JSONURL2,
                contentType: "application/json-in-script; charset=utf-8",
                success: function(data) {
                    callback(data);

                }
            });

function callback(data) {
  console.log(data);
}

  google.charts.load('visualization','1', {packages: ['corechart','line']});
  google.charts.setOnLoadCallback(runQueries);

  function runQueries() {
    var spreadsheetKey = "19Uc0FgtNDp9EfFhiHZJHG0ax8ZCtdvxSkbZryiOxSKo&gid=1690305366";

    var getSessionsToComplete = new google.visualization.Query('http://spreadsheets.google.com/tq?key='+spreadsheetKey+'&range=D17:F17');
    getSessionsToComplete.send(drawSessionsToComplete);

    var getCompletionRate = new google.visualization.Query('http://spreadsheets.google.com/tq?key='+spreadsheetKey+'&range=H4:L6');
    getCompletionRate.send(drawCompletionRate);

    var getCompletionTime = new google.visualization.Query('http://spreadsheets.google.com/tq?key='+spreadsheetKey+'&range=O3:Q5');
    getCompletionTime.send(drawCompletionTime);
  }

  function drawCompletionRate (response) {
    var getData    = response.getDataTable(),
        ratePip1   = (getData.getValue(0,3)*100).toFixed(),
        ratePip2   = (getData.getValue(1,3)*100).toFixed(),
        changePip1 = (getData.getValue(0,4)*100).toFixed(2),
        changePip2 = (getData.getValue(1,4)*100).toFixed(2),
        arrowPip1  = changePip1 > 0 ? 'increase' : 'decrease',
        arrowPip2  = changePip2 > 0 ? 'increase' : 'decrease';

    $('#stat-1').append('<h3 class="heading-xlarge">' + ratePip1 + '% <span class="heading-small"> completed</span></h3>' +
      '<p><span class="' + arrowPip1 + '"></span>' + changePip1 + '% ' + arrowPip1 + '</p>');

    $('#stat-2').append('<h3 class="heading-xlarge">' + ratePip2 + '% <span class="heading-small"> completed</span></h3>' +
      '<p><span class="' + arrowPip2 + '"></span>' + changePip2 + '% ' + arrowPip2 + '</p>');
  }

  function drawStats (container,data) {
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

  function drawSessionsToComplete (response) {
    drawStats('stat-3',response)
  }

  function getTimes(time) {
    var hours     = time[0] > 0 ? time[0] + 'h' : '',
        minutes   = time[1] + 'm',
        seconds   = time[2] + 's',
        totalTime = hours + ' ' + minutes + ' ' + seconds;
        return totalTime;
  }

  function getChangeTimes(time) {
    var time = time.replace("-","").split(":"),
        hours = parseInt(time[0]) > 0 ? parseInt(time[0]) + 'h' : '',
        minutes = parseInt(time[1]) > 0 ? parseInt(time[1]) + 'm' : '',
        seconds = parseInt(time[2]) > 0 ? parseInt(time[2]) + 's' : '',
        totalTime = hours + ' ' + minutes + ' ' + seconds;
        return totalTime.trim();
  }

  function drawCompletionTime (response) {
    var getData            = response.getDataTable(response),
        timePip1           = getData.getValue(0,0),
        timePip2           = getData.getValue(1,0),
        timeTotal          = getData.getValue(2,0),
        changeTimePip1     = getData.getFormattedValue(0,1),
        changeTimePip2     = getData.getFormattedValue(1,1),
        changeTimeTotal    = getData.getFormattedValue(2,1),
        changePercentPip1  = getData.getValue(0,2),
        changePercentPip2  = getData.getValue(1,2),
        changePercentTotal = getData.getValue(2,2),
        arrowPip1          = changePercentPip1 > 0 ? 'increase' : 'decrease',
        arrowPip2          = changePercentPip2 > 0 ? 'increase' : 'decrease',
        arrowTotal         = changePercentTotal > 0 ? 'increase' : 'decrease';

    $('#stat-4').append('<h3 class="heading-xlarge">' + getTimes(timePip1) + '</h3>'+
      '<p><span class="' + arrowPip1 + '"></span>' + getChangeTimes(changeTimePip1) + ' ' + arrowPip1 + '</p>');
    $('#stat-5').append('<h3 class="heading-xlarge">' + getTimes(timePip2) + '</h3>'+
      '<p><span class="' + arrowPip2 + '"></span>' + getChangeTimes(changeTimePip2) + ' ' + arrowPip2 + '</p>');
    $('#stat-6').append('<h3 class="heading-xlarge">' + getTimes(timeTotal) + '</h3>'+
      '<p><span class="' + arrowTotal + '"></span>' + getChangeTimes(changeTimeTotal) + ' ' + arrowTotal + '</p>');
  }

})
