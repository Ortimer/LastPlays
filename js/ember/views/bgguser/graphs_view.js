BggBuddy.BgguserGraphsView = Ember.View.extend({
  afterRenderEvent: function() {
    var controller = this.get('controller');
    var tempChart;
    var legend;

    tempChart = new Chart($("#games-per-year-graph").get(0).getContext("2d")).Bar(controller.get('gamesPerYearOptions'), {
      legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    });

    //then you just need to generate the legend
    legend = tempChart.generateLegend();

    //and append it to your page somewhere
    $('#games-per-year-graph-legend').append(legend);


    tempChart = new Chart($("#avgRating-per-year-graph").get(0).getContext("2d")).Line(controller.get('avgRatingPerYearOptions'), {
      legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    });

    //then you just need to generate the legend
    legend = tempChart.generateLegend();

    //and append it to your page somewhere
    $('#avgRating-per-year-graph-legend').append(legend);


    tempChart = new Chart($("#games-per-players-graph").get(0).getContext("2d")).Bar(controller.get('gamesPerPlayersOptions'), {
      legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    });

    //then you just need to generate the legend
    legend = tempChart.generateLegend();

    //and append it to your page somewhere
    $('#games-per-players-legend').append(legend);

    tempChart = new Chart($("#games-per-category-graph").get(0).getContext("2d")).Radar(controller.get('gamesPerCategoryOptions'), {
      legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    });

    //then you just need to generate the legend
    legend = tempChart.generateLegend();

    //and append it to your page somewhere
    $('#games-per-category-legend').append(legend);
  }
});
