$(function(){
  google.charts.load('visualization','1', {packages: ['corechart','line']});
  google.charts.setOnLoadCallback(runQueries);

  function completionRate (data) {
    var queryJson  = getChartData(data),
        ratePip1   = (queryJson.table.rows[0].c[3].v*100).toFixed(),
        ratePip2   = (queryJson.table.rows[1].c[3].v*100).toFixed(),
        changePip1 = (queryJson.table.rows[0].c[4].v*100).toFixed(2),
        changePip2 = (queryJson.table.rows[1].c[4].v*100).toFixed(2),
        arrowPip1  = changePip1 > 0 ? 'increase' : 'decrease',
        arrowPip2  = changePip2 > 0 ? 'increase' : 'decrease';
console.log(queryJson);
    $('#completion-pip-1').append('<h3 class="heading-xlarge">' + ratePip1 + '% <span class="heading-small"> completed</span></h3>' +
      '<p><span class="' + arrowPip1 + '"></span>' + changePip1 + '% ' + arrowPip1 + '</p>');

    $('#completion-pip-2').append('<h3 class="heading-xlarge">' + ratePip2 + '% <span class="heading-small"> completed</span></h3>' +
      '<p><span class="' + arrowPip2 + '"></span>' + changePip2 + '% ' + arrowPip2 + '</p>');
  }

  function completionTime(data) {
    var queryJson          = getChartData(data),
        timePip1           = getTimes(queryJson.table.rows[0].c[0].v),
        timePip2           = getTimes(queryJson.table.rows[1].c[0].v),
        timeTotal          = getTimes(queryJson.table.rows[2].c[0].v),
        changeTimePip1     = getChangeTimes(queryJson.table.rows[0].c[1].f),
        changeTimePip2     = getChangeTimes(queryJson.table.rows[1].c[1].f),
        changeTimeTotal    = getChangeTimes(queryJson.table.rows[2].c[1].f),
        changePercentPip1  = queryJson.table.rows[0].c[2].v,
        changePercentPip2  = queryJson.table.rows[1].c[2].v,
        changePercentTotal = queryJson.table.rows[2].c[2].v,
        arrowPip1          = changePercentPip1 > 0 ? 'increase' : 'decrease',
        arrowPip2          = changePercentPip2 > 0 ? 'increase' : 'decrease',
        arrowTotal         = changePercentTotal > 0 ? 'increase' : 'decrease';

    $('#time-to-complete-pip-1').append('<h3 class="heading-xlarge">' + timePip1 + '</h3>'+
      '<p><span class="' + arrowPip1 + '"></span>' + changeTimePip1 + ' ' + arrowPip1 + '</p>');
    $('#time-to-complete-pip-2').append('<h3 class="heading-xlarge">' + timePip2 + '</h3>'+
      '<p><span class="' + arrowPip2 + '"></span>' + changeTimePip2 + ' ' + arrowPip2 + '</p>');
    $('#total-time-to-complete').append('<h3 class="heading-xlarge">' + timeTotal + '</h3>'+
      '<p><span class="' + arrowTotal + '"></span>' + changeTimeTotal + ' ' + arrowTotal + '</p>');
  }

  function runQueries() {
     $.ajax({
       url : './pip-query.php?query=sessionsToComplete',
         success:function(data) {
           drawStats('sessions-to-complete',data);
        }
     });

     $.ajax({
       url : './pip-query.php?query=completionRate',
         success:function(data) {
           completionRate(data)
        }
     });

     $.ajax({
       url : './pip-query.php?query=completionTime',
         success:function(data) {
           completionTime(data)
        }
     });
   }

});
