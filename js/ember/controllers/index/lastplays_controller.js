BggBuddy.IndexLastplaysController = Ember.ArrayController.extend({
  sortProperties: ['name'],
  sortAscending: true,
  orderedByName: function() {
    return this.get('sortProperties')[0] == 'name';
  }.property('sortProperties'),
  orderedByDays: function() {
    return this.get('sortProperties')[0] == 'lastPlay.date';
  }.property('sortProperties'),
  orderedByPlays: function() {
    return this.get('sortProperties')[0] == 'totalPlays';
  }.property('sortProperties'),
  allPlaysLoaded: function() {
    var model = this.get('model');
    return model.reduce(function(previousValue, game){
        return previousValue && (game.get('lastPlay.date') != null);
    }, true);
  }.property('model.@each.lastPlay.date'),
  actions: {
    sortBy: function(property) {
      if (this.get('sortProperties')[0] == property) {
        this.set('sortAscending', !this.get('sortAscending'));
      } else {
        this.set('sortProperties', [property]);
        this.set('sortAscending', true);
      }
    }
  }
});
