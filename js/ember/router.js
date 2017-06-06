BggBuddy.Router.map(function() {
  this.resource('root', { path: '/' });
  this.resource('bgguser', { path: '/:bggUser' }, function () {
    this.route('lastplays', { path: 'lastplays' });
    this.route('hindex', { path: 'hindex' });
    this.route('graphs', { path: 'graphs' });
  });
});
