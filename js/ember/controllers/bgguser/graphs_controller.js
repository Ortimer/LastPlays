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
      element: 'games-per-year-graph',
      data: gamesData,
      xkey: 'year',
      ykeys: ['gamesCount'],
      labels: ['gamesCount'],
      hideHover: 'true',
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
  }.property(),
  avgRatingPerYearOptions : function () {
    var gamesData = [];
    var gamesPerYearTemp = [];

    this.forEach(function(game) {
      var year = game.get('yearpublished');

      if (game.get('rating') != null && game.get('rating') != 0) {
        if (gamesPerYearTemp[year]) {
          gamesPerYearTemp[year].count++;
          gamesPerYearTemp[year].sumRating += game.get('rating');
          gamesPerYearTemp[year].sumRatingBgg += game.get('ratingBgg');
        } else {
          gamesPerYearTemp[year] = {
            count: 1,
            sumRating: game.get('rating'),
            sumRatingBgg: game.get('ratingBgg')
          };
        }
      }
    });

    $(gamesPerYearTemp).map(function(key, gameItem){
      if (gameItem) {
        var singleYear = {
          year: key.toString(),
          avgRating: Math.round(gameItem.sumRating / gameItem.count * 100) / 100,
          avgRatingBgg: Math.round(gameItem.sumRatingBgg / gameItem.count * 100) / 100
        };
        gamesData.push(singleYear);
      }
    });

    var options = {
      element: 'avgRating-per-year-graph',
      data: gamesData,
      xkey: 'year',
      xLabels: 'year',
      ykeys: ['avgRating', 'avgRatingBgg'],
      labels: ['Avg. Own Rating', 'Avg. Bgg Rating'],
      hideHover: 'true'
    }

    return options;
  }.property()
});
