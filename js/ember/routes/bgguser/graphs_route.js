BggBuddy.BgguserGraphsRoute = Ember.Route.extend({
  model: function(params){
    var bggUser = this.modelFor('bgguser');

    return this.store.find('game', {username: bggUser.get('id'), own: 1});
  }
});
