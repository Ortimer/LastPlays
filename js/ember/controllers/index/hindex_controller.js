BggBuddy.IndexHindexController = BaseGameController.extend({
  filter: 0, //0: No filter, 1: H-Index, 2: Not played
  filteredContent: function () {
    var self = this;
    var filter = this.get('filter');
    var games = this.get('arrangedContent');
    var filtered;

    switch (filter) {
      case 1:
        filtered = games.filter(function(game){
          return game.get('totalPlays') >= self.get('hindexvalue');
        });
        break;
      case 2:
        filtered = games.filter(function(game){
          return game.get('totalPlays') == 0;
        });
        break;
      case 0:
      default:
        filtered = games;
    }

    return filtered;
  }.property('arrangedContent', 'filter'),
  hindexvalue: function () {
    var model = this.get('model');
    var plays = [];

    model.forEach(function(game){
        if (game.get('totalPlays') != 0) {
          for (var i = 1; i <= game.get('totalPlays'); i++) {
            if (plays[i] == null) {
              plays[i] = [];
            }
            plays[i].push(game);
          }
        }
    });

    var hindex = 0;

    for (var i = 1; i < plays.length; i++) {
      if (plays[i].length < i) {
        break;
      }
      hindex++;
    }

    model.forEach(function(game){
      if (game.get('totalPlays') == 0) {
        game.set('customClass', 'noplay');
      } else if (game.get('totalPlays') >= hindex) {
        game.set('customClass', 'hindex');
      }

      if (game.get('totalPlays') >= hindex - 3 && game.get('totalPlays') < hindex + 1) {
        game.set('hindexDiff', hindex + 1 - game.get('totalPlays'));
      }
    });

    return hindex;
  }.property('model.@each.totalPlays'),
  sumPlays: function () {
    var model = this.get('model');
    return model.reduce(function(previousValue, game){
        return previousValue + game.get('totalPlays');
    }, 0);
  }.property('model.@each.totalPlays'),
  unplayedGames: function () {
    var model = this.get('model');
    return model.reduce(function(previousValue, game){
      if (game.get('totalPlays') == 0) {
        return previousValue + 1;
      } else {
        return previousValue;
      }
    }, 0);
  }.property('model.@each.totalPlays'),
  actions: {
    setFilter: function (type) {
      this.set('filter', type);
    }
  }
});
