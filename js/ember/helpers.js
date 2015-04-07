Ember.Handlebars.helper('formatdate', function(value, options) {
  var escaped = Handlebars.Utils.escapeExpression(value);
  var formatedDate = moment(new Date(escaped)).format('DD-MMM-YYYY');

  return new Ember.Handlebars.SafeString(formatedDate);
});
