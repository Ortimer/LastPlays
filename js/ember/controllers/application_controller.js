BggBuddy.ApplicationController = Ember.Controller.extend({
  updateCurrentPath: function() {
    BggBuddy.set('currentPath', this.get('currentPath'));
  }.observes('model.currentPath')
});
