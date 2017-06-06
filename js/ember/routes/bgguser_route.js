BggBuddy.BgguserRoute = Ember.Route.extend({
  model: function(params){
    return this.store.find('bggUser', params.bggUser);
  },
  afterModel: function(bggUser, transition) {
    if (bggUser == null) {
      this.transitionTo('root');
    }
  }
});
