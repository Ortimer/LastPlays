BggBuddy.BgguserLastplaysController = BaseGameController.extend({
  orderedByDays: function() {
    return this.get('sortProperties')[0] == 'lastPlay.date';
  }.property('sortProperties'),
  allPlaysLoaded: function() {
    var model = this.get('model');
    return model.reduce(function(previousValue, game){
        return previousValue && (game.get('lastPlay.date') != null);
    }, true);
  }.property('model.@each.lastPlay.date')
});
