BggBuddy.BgguserGraphsController = BaseGameController.extend({
  gamesPerYearOptions : function () {
    var gamesData = [];
    var gamesPerYearTemp = [];
    var labels = [];

    this.forEach(function(game) {
      var year = game.get('yearpublished');

      if (labels.indexOf(year) == -1) {
        labels.push(year);
      }

      if (gamesPerYearTemp[year]) {
        gamesPerYearTemp[year].push(game);
      } else {
        gamesPerYearTemp[year] = [game];
      }
    });

    labels.sort();

    $(gamesPerYearTemp).map(function(key, gameCount){
      if (gameCount) {
        var singleYear = {
          year: key.toString(),
          games: gameCount,
          gamesCount: gameCount.length
        };
        gamesData.push(gameCount.length);
      }
    });

    var data = {
      labels: labels,
      datasets: [
        {
          label: "Owned games per year",
          fillColor: "rgba(151,187,205,0.5)",
          strokeColor: "rgba(151,187,205,0.8)",
          highlightFill: "rgba(151,187,205,0.75)",
          highlightStroke: "rgba(151,187,205,1)",
          data: gamesData
        }
      ]
    };

    return data;
  }.property(),
  avgRatingPerYearOptions : function () {
    var avgRating = [];
    var avgRatingBgg = [];
    var gamesPerYearTemp = [];
    var labels = [];

    this.forEach(function(game) {
      var year = game.get('yearpublished');
      if (game.get('rating') != null && game.get('rating') != 0) {
        if (labels.indexOf(year) == -1) {
          labels.push(year);
        }

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

    labels.sort();

    $(gamesPerYearTemp).map(function(key, gameItem){
      if (gameItem) {
        avgRating.push(Math.round(gameItem.sumRating / gameItem.count * 100) / 100);
        avgRatingBgg.push(Math.round(gameItem.sumRatingBgg / gameItem.count * 100) / 100);
      }
    });

    var data = {
      labels: labels,
      datasets: [
        {
          label: "Average rating per year",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: avgRating
        },
        {
          label: "Average BGG rating per year",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: avgRatingBgg
        }
      ]
    };

    return data;
  }.property(),
  gamesPerPlayersOptions : function () {
    var gamesData = [];
    var gamesPerPlayersTemp = [];
    var labels = [];
    var playerCountTemp = [];
    var RIDICULE_THRESHOLD = 13;
    var ridiculeLabel = RIDICULE_THRESHOLD + '+ Players';

    this.forEach(function(game) {
      var minPlayers = game.get('minplayers');
      var maxPlayers = game.get('maxplayers');

      if (minPlayers && maxPlayers) {
        // Some games las Ultimate Werewolf have ricule number count so let's put then in the same place
        if (maxPlayers >= RIDICULE_THRESHOLD) {
          maxPlayers = RIDICULE_THRESHOLD;
        }

        for (var i = minPlayers; i <= maxPlayers; i++) {
          if (playerCountTemp.indexOf(i) == -1) {
            playerCountTemp.push(i);
          }

          if (gamesPerPlayersTemp[i]) {
            gamesPerPlayersTemp[i].push(game);
          } else {
            gamesPerPlayersTemp[i] = [game];
          }
        }
      }
    });

    for (var i = 1; i <= RIDICULE_THRESHOLD; i++) {
      if (playerCountTemp.indexOf(i) != -1) {
        if (i != RIDICULE_THRESHOLD) {
          labels.push(i);
        } else {
          labels.push(ridiculeLabel);
        }
      }
    }

    $(gamesPerPlayersTemp).map(function(key, gameCount){
      if (gameCount) {
        var playerLabel = key.toString() + ' Players';

        if (key == RIDICULE_THRESHOLD) {
          playerLabel = ridiculeLabel;
        }

        var singlePlayer = {
          players: playerLabel,
          games: gameCount,
          gamesCount: gameCount.length
        };
        gamesData.push(gameCount.length);
      }
    });

    var data = {
      labels: labels,
      datasets: [
        {
          label: "Owned games per number of players",
          fillColor: "rgba(151,187,205,0.5)",
          strokeColor: "rgba(151,187,205,0.8)",
          highlightFill: "rgba(151,187,205,0.75)",
          highlightStroke: "rgba(151,187,205,1)",
          data: gamesData
        }
      ]
    };

    return data;
  }.property()
});
