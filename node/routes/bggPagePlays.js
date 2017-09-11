var express = require('express');
var getBggData = require('../bgg');
var router = express.Router();
var RateLimiter = require('limiter').RateLimiter;
var limiter = new RateLimiter(1, 750);

router.get('/:username-:pageNumber', function(req, res) {
  limiter.removeTokens(1, function() {
    var args = {
      'username': req.params.username,
      'page': req.params.pageNumber
    }
    var bggPlaysPromise = getBggData('plays', args);

    bggPlaysPromise
      .then(function(bggPlaysData) {
        bggPlaysData = bggPlaysData.data;

        var playResponse = [];

        if (bggPlaysData.plays && bggPlaysData.plays.play) {
          for (var i = 0, len = bggPlaysData.plays.play.length; i < len; i++) {
            var item = bggPlaysData.plays.play[i];
            var playData = {};

            playData.id = req.params.username + '-' + item.item[0].$.objectid;
            playData.bgg_id = item.item[0].$.objectid;
            playData.date = item.$.date;
            playData.location = item.$.location;

            playResponse.push(playData);
          }
        }

        playData = {
          play: playResponse
        };

        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        res.write(JSON.stringify(playData));
        res.send();
      }, function(err) {
        console.error(err);
        console.trace();

        if (err.statusCode) {
          res.writeHead(err.statusCode);
        } else {
          res.writeHead(500);
        }
        res.write(err.message);
        res.send();
      });
  });
});

module.exports = router;
