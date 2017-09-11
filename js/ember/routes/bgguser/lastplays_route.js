BggBuddy.BgguserLastplaysRoute = Ember.Route.extend({
  model: function(params){
    var bggUser = this.modelFor('bgguser');

    return this.store.find('lastplaygame', {username: bggUser.get('id'), own: 1, played: 1});
  },
  afterModel: function(bggCollectionModel) {
    var self = this;
    var bggUserId = this.modelFor('bgguser').get('id');
    var pageNumber = 1;
    var gamesMap = {};

    for (var i = 0; i < bggCollectionModel.get("content").length; i++) {
      var gameModel = bggCollectionModel.get("content")[i];
      var gameId = gameModel.get("id");

      gamesMap[gameId] = gameModel;

    }

    var loadJSON = function (bggUserId, pageNumber) {
      $.getJSON( "pageplays/" + bggUserId + '-' + pageNumber, function(playData) {
        if (playData.play.length > 0 && Object.keys(gamesMap).length > 0) {
          for (var i = 0; i < playData.play.length; i++) {
            var game = gamesMap[playData.play[i].bgg_id];
            if (game != null && game.get('lastPlay') == null) {
              var play = self.store.createRecord('play', playData.play[i]);

              delete gamesMap[playData.play[i].bgg_id];
              game.set('lastPlay', play);
            }
          }
          if (Object.keys(gamesMap).length > 0) {
            loadJSON(bggUserId, ++pageNumber);
          }
        }
      })
      .fail(function() {
        console.log(self.get('lastPlay_id') + ' - Retry ' + retryCount);
        if (retryCount++ <= 5) {
          loadJSON(bggUserId, pageNumber);
        }
      });
    }
    loadJSON(bggUserId, pageNumber);
  }
});
