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
  }),
  lastPlayMillis: function() {
    var now = moment(); // get the current moment
    var then = moment(new Date(this.get('lastPlay.date')));
    var ms = then.diff(now, 'milliseconds', true);

    return ms;
  }.property('lastPlay'),
  lastPlayText: function() {
    var now = moment(); // get the current moment
    var then = moment(new Date(this.get('lastPlay.date')));
    var ms = then.diff(now, 'milliseconds', true);

    var years = Math.floor(moment.duration(ms).asYears());

    then = then.subtract(years, 'years');
    ms = then.diff(now, 'milliseconds', true);

    var months = Math.floor(moment.duration(ms).asMonths());

    then = then.subtract(months, 'months').subtract(1, 'days');
    ms = then.diff(now, 'milliseconds', true);

    days = Math.floor(moment.duration(ms).asDays());

    var result = '';

    if (years > 0) {
      result += years + ' year(s) ';
    }

    if (months > 0) {
      result += months + ' month(s) ';
    }

    if (days > 0) {
      result += days + ' day(s) ';
    }

    return result.trim();
  }.property('lastPlay')
});

BggBuddy.Play = DS.Model.extend({
  game_id: DS.belongsTo('game'),
  date: DS.attr('date'),
  location: DS.attr('string')
});
