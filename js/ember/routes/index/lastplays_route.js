BggBuddy.IndexLastplaysRoute = Ember.Route.extend({
  model: function(params){
    var bggUser = this.modelFor('index');

    return this.store.find('lastplaygame', {username: bggUser.get('id')});
  }
});
