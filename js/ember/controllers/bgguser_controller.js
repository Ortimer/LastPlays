BggBuddy.BgguserController = Ember.Controller.extend({
  needs: 'application',
  showOutlet: function() {
    var currentPath = this.get('controllers.application.currentPath');

    return currentPath != 'bgguser.index';
  }.property('controllers.application.currentPath')
});
