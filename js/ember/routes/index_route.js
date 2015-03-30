BggBuddy.IndexRoute = Ember.Route.extend({
  model: function(){
    return Ember.$.getJSON('bggUser');
  },
  afterModel: function(bggUser, transition) {
    if (bggUser != null) {
      this.transitionTo('index.lastplays');
    } else {
      this.transitionTo('root');
    }
  }
});
