BggBuddy.BgguserGraphsController = BaseGameController.extend({
  gamesPerYearOptions : function () {
    var gamesData = [];
    var gamesPerYearTemp = [];

    this.forEach(function(game) {
      var year = game.get('yearpublished');

      if (gamesPerYearTemp[year]) {
        gamesPerYearTemp[year].push(game);
      } else {
        gamesPerYearTemp[year] = [game];
      }
    });

    $(gamesPerYearTemp).map(function(key, gameCount){
      if (gameCount) {
        var singleYear = {
          year: key.toString(),
          games: gameCount,
          gamesCount: gameCount.length
        };
        gamesData.push(singleYear);
      }
    });

    var options = {
      // ID of the element in which to draw the chart.
      element: 'games-per-year-graph',
      // Chart data records -- each entry in this array corresponds to a point on
      // the chart.
      data: gamesData,
      // The name of the data record attribute that contains x-values.
      xkey: 'year',
      // A list of names of data record attributes that contain y-values.
      ykeys: ['gamesCount'],
      // Labels for the ykeys -- will be displayed when you hover over the
      // chart.
      labels: ['gamesCount'],
      hoverCallback: function (index, options, content, row) {
        var hoverHtml = '
          <div class="morris-hover-row-label">' + row.year + '</div>
          <div class="morris-hover-point" style="color: #0b62a4">
            Games:
          </div>';

          for (var i = 0; i < row.gamesCount && i < 3; i++) {
            hoverHtml += '<div class="morris-hover-point" style="color: #0b62a4">' + row.games[i].get('name') + '<div>';
          }

          if (row.gamesCount > 3) {
            hoverHtml += '<div class="morris-hover-point" style="color: #0b62a4">... and ' + (row.gamesCount - 3) + ' more<div>';
          }

        return hoverHtml;
      }
    }

    return options;
  }.property()
});
