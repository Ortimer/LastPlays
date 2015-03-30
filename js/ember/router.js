BggBuddy.Router.map(function() {
  this.resource('root', { path: '/' });
  this.resource('index', { path: '/:bggUser' }, function () {
    this.route('lastplays', { path: 'lastplays' });
  });
});
