BggBuddy.Lastplaygame = BggBuddy.Game.extend({
  lastPlay_id: DS.attr('string'),
  lastPlay: DS.belongsTo('play'),
  lastPlayWatcher: function () {
    var self = this;
    var retryCount = 1;

    var loadJSON = function () {
      if (!self.store.recordIsLoaded('play', self.get('lastPlay_id'))) {
        $.getJSON( "plays/" + self.get('lastPlay_id'), function(playData) {
          var play = self.store.createRecord('play', playData.play);
          self.set('lastPlay', play);
        })
        .fail(function() {
          console.log(self.get('lastPlay_id') + ' - Retry ' + retryCount);
          if (retryCount++ <= 5) {
            loadJSON();
          }
        });
      }
    }

    loadJSON();
  }.observes('lastPlay_id'),
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
  bgg_id: DS.attr('number'),
  date: DS.attr('date'),
  location: DS.attr('string')
});
