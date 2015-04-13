BggBuddy.Game = DS.Model.extend({
  bggUrl: DS.attr('string'),
  name: DS.attr('string'),
  image: DS.attr('string'),
  totalPlays: DS.attr('number')
});
