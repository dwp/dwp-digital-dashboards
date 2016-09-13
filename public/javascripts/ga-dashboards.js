function getChartData(data) {
  //strip out all text and convert to json
  var queryJson = data.replace('/*O_o*/',''),
      queryJson = queryJson.replace('google.visualization.Query.setResponse(','').trim(),
      queryJson = JSON.parse(queryJson.slice(0, -2));
  return queryJson;
}

function drawStats(container,data) {
  var queryJson       = getChartData(data),
      total2b         = queryJson.table.rows[0].c[0].v,
      total21         = queryJson.table.rows[0].c[1].v,
      totalDifference = (total21-total2b),
      arrow           = totalDifference > 0 ? 'increase' : 'decrease',
      change          = ((queryJson.table.rows[0].c[2].v*100).toFixed(2));

      if (totalDifference % 1 != 0) {
        totalDifference = totalDifference.toFixed(2)
      }

      if (total21 % 1 != 0) {
        total21 = total21.toFixed(2)
      }

  $('#' + container).append('<h3 class="heading-xlarge">' + total21 + '</h3>'+
    '<p>(' + totalDifference + ')<span class="' + arrow + '"></span>' + change + '% ' + arrow + '</p>');
}

function getTimes(time) {
  var hours     = time[0] > 0 ? time[0] + 'h' : '',
      minutes   = time[1] > 0 ? time[1] + 'm' : '',
      seconds   = parseInt(time[3]) > 500 ? (parseInt(time[2]) + 1) + 's' : time[2] + 's',
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
