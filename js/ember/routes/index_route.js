BggBuddy.IndexRoute = Ember.Route.extend({
  model: function(params){
    var userParams = {
      "name": params.bggUser
    };

    return Ember.$.getJSON('bggUser', userParams);
  },
  afterModel: function(bggUser, transition) {
    if (bggUser != null) {
      this.transitionTo('index.lastplays');
    } else {
      this.transitionTo('root');
    }
  }
});
