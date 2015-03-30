BggBuddy.IndexLastplaysRoute = Ember.Route.extend({
  model: function(){
    var bggUser = this.modelFor('index');

    var playsParams = {
      "username": bggUser.username,
      "own": 1,
      "excludesubtype": "boardgameexpansion",
      "played": 1
    };

    return Ember.$.getJSON('bggPlays', playsParams);
  }
});
