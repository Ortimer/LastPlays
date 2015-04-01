BggBuddy.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('menuInfo', 1);
  },
  aftermodel: function () {
    $('#side-menu').metisMenu();
  }
});
