$(function(){
  google.charts.load('visualization','1', {packages: ['corechart','line']});
  google.charts.setOnLoadCallback(runQueries);

  function test(data) {
    var queryJson       = getChartData(data);
    console.log(queryJson);
  }

  function runQueries() {
     $.ajax({
       url : '../DS1500/DS1500.php?query=deviceUsage',
         success:function(data) {
           test(data);
        }
     });
   }

});
