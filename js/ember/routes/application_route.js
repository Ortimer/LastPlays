BggBuddy.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('menu', 1);
  }
});
