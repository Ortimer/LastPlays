BggBuddy.ApplicationRoute = Ember.Route.extend({
  model: function(){
    return Ember.$.getJSON('menuInfo');
  }
});
