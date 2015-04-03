BggBuddy.IndexRoute = Ember.Route.extend({
  model: function(params){
    return this.store.find('bggUser', params.bggUser);
  },
  afterModel: function(bggUser, transition) {
    if (bggUser != null) {
      this.transitionTo('index.lastplays');
    } else {
      this.transitionTo('root');
    }
  }
});
