BggBuddy.Game = DS.Model.extend({
  bggUrl: DS.attr('string'),
  name: DS.attr('string'),
  image: DS.attr('string'),
  totalPlays: DS.attr('number'),
  lastPlay: DS.belongsTo('play', {
    async: true
  }),
  lastPlayText: function() {
    var now = moment().utcOffset('+0'); // get the current moment
    var then = moment(new Date(this.get('lastPlay.date'))).utcOffset('+0');
    var ms = now.diff(then, 'milliseconds', true);

    var years = Math.floor(moment.duration(ms).asYears());

    now = now.subtract(years, 'years');
    ms = now.diff(then, 'milliseconds', true);

    var months = Math.floor(moment.duration(ms).asMonths());

    now = now.subtract(months, 'months');
    ms = now.diff(then, 'milliseconds', true);

    days = Math.floor(moment.duration(ms).asDays());

    var result = '';

    if (years > 0) {
      result += years + ' year(s) ';
    }

    if (months > 0) {
      result += months + ' month(s) ';
    }

    result += days + ' day(s)';

    return result.trim();
  }.property('lastPlay.date')
});

BggBuddy.Play = DS.Model.extend({
  game_id: DS.belongsTo('game'),
  date: DS.attr('date'),
  location: DS.attr('string')
});
