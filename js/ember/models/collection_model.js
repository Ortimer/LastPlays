BggBuddy.Collection = DS.Model.extend({
  games: DS.hasMany('game')
});

BggBuddy.Game = DS.Model.extend({
  collection_id: DS.belongsTo('collection'),
  bggUrl: DS.attr('string'),
  name: DS.attr('string'),
  image: DS.attr('string'),
  totalPlays: DS.attr('string'),
  lastPlay: DS.belongsTo('play', {
    async: true
  })
});

BggBuddy.Play = DS.Model.extend({
  game_id: DS.belongsTo('game'),
  date: DS.attr('date'),
  location: DS.attr('string')
});
