BggBuddy.IndexHindexController = BaseGameController.extend({
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
  }.property('model.@each.totalPlays')
});
