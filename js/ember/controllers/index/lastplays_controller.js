BggBuddy.IndexLastplaysController = Ember.Controller.extend({
  ascSymbol: '<span class="glyphicon glyphicon-triangle-top" aria-hidden="true"></span>',
  descSymbol: '<span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>',
  nameOrder: 'asc',
  daysOrder: null,
  playsOrder: null,
  nameOrderSymbol: function () {
    var symbolHtml = '';
    if (this.get('nameOrder') == 'asc') {
      symbolHtml = this.get('ascSymbol');
    } else if (this.get('nameOrder') == 'desc') {
      symbolHtml = this.get('descSymbol');
    }

    return new Ember.Handlebars.SafeString(symbolHtml);
  }.property('nameOrder'),
  daysOrderSymbol: function () {
    var symbolHtml = '';
    if (this.get('daysOrder') == 'asc') {
      symbolHtml = this.get('ascSymbol');
    } else if (this.get('daysOrder') == 'desc') {
      symbolHtml = this.get('descSymbol');
    }

    return new Ember.Handlebars.SafeString(symbolHtml);
  }.property('daysOrder'),
  playsOrderSymbol: function () {
    var symbolHtml = '';
    if (this.get('playsOrder') == 'asc') {
      symbolHtml = this.get('ascSymbol');
    } else if (this.get('playsOrder') == 'desc') {
      symbolHtml = this.get('descSymbol');
    }

    return new Ember.Handlebars.SafeString(symbolHtml);
  }.property('playsOrder'),
  actions: {
    toggleName: function () {
      this.set('daysOrder', null);
      this.set('playsOrder', null);
      if (this.get('nameOrder') == null || this.get('nameOrder') == 'desc') {
        this.set('nameOrder', 'asc');
      } else {
        this.set('nameOrder', 'desc');
      }
    },
    toggleDays: function () {
      this.set('nameOrder', null);
      this.set('playsOrder', null);
      if (this.get('daysOrder') == null || this.get('daysOrder') == 'desc') {
        this.set('daysOrder', 'asc');
      } else {
        this.set('daysOrder', 'desc');
      }
    },
    togglePlays: function () {
      this.set('nameOrder', null);
      this.set('daysOrder', null);
      if (this.get('playsOrder') == null || this.get('playsOrder') == 'desc') {
        this.set('playsOrder', 'asc');
      } else {
        this.set('playsOrder', 'desc');
      }
    }
  }
});
