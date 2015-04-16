BggBuddy.BgguserGraphsView = Ember.View.extend({
  afterRenderEvent: function() {
    var controller = this.get('controller');

    new Morris.Bar(controller.get('gamesPerYearOptions'));

    new Morris.Line(controller.get('avgRatingPerYearOptions'));
  }
});
