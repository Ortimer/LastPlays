var express = require('express');
var getBggData = require('../bgg');
var router = express.Router();

router.get('/:username-:gameid', function(req, res) {
  var args = {
    'username': req.params.username,
    'id': req.params.gameid
  }
  var bggPlaysPromise = getBggData('plays', args);

  bggPlaysPromise
    .then(function(bggPlaysData) {
      bggPlaysData = bggPlaysData.data;

      var playData = {}

      if (bggPlaysData.plays && bggPlaysData.plays.play) {
        var item = bggPlaysData.plays.play[0];

        playData.id = item.$.id;
        playData.game_id = req.params.gameid;
        playData.date = item.$.date;
        playData.location = item.$.location;
      }

      playData = {
        play: playData
      };

      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(playData));
      res.send();
    }, function(err) {
      console.log(err);
      console.trace();

      res.writeHead(500);
      res.write(err.message);
      res.send();
    });
});

module.exports = router;
