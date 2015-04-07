BggBuddy.IndexLastplaysController = Ember.Controller.extend({
  orderByArray: ['Name', 'Days', 'Total plays'],
  orderByIndex: 0,
  orderBy: function() {
    return this.get('orderByArray')[this.get('orderByIndex')];
  }.property('orderByIndex'),

  orderTypeArray: ['Ascending', 'Descending'],
  orderTypeIndex: 0,
  orderType: function() {
    return this.get('orderTypeArray')[this.get('orderTypeIndex')];
  }.property('orderTypeIndex'),

  actions: {
    changeOrderBy: function() {
      var orderByIndex = this.get('orderByIndex') + 1;
      if (orderByIndex >= this.get('orderByArray').length) {
        orderByIndex = 0;
      }
      this.set('orderByIndex', orderByIndex);

      this.get('model').get('games').sortBy('id');
    },
    changeOrderType: function() {
      var orderTypeIndex = this.get('orderTypeIndex') + 1;
      if (orderTypeIndex >= this.get('orderTypeArray').length) {
        orderTypeIndex = 0;
      }
      this.set('orderTypeIndex', orderTypeIndex);
    }
  }
});
