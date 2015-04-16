BggBuddy.Game = DS.Model.extend({
  bggUrl: DS.attr('string'),
  name: DS.attr('string'),
  image: DS.attr('string'),
  totalPlays: DS.attr('number'),
  yearpublished: DS.attr('number'),
  minplayers: DS.attr('number'),
  maxplayers: DS.attr('number'),
  playingtime: DS.attr('number'),
  numowned: DS.attr('number'),
  rating: DS.attr('number'),
  ratingBgg: DS.attr('number')
});
