var express = require('express');
var getBggData = require('../bgg');
var router = express.Router();

router.get('/:username/:gameid', function(req, res) {
  try {
    var args = {
      'username': req.params.username,
      'id': req.params.gameid
    }
    var bggPlaysData = getBggData('plays', args);

    var playData = {
      'plays': []
    }

    if (bggPlaysData.plays) {
      if (bggPlaysData.plays.play) {
        bggPlaysData.plays.play.forEach(function(item, index) {
          var play = {};

          play.id = item.$.id;
          play.date = item.$.date;
          play.location = item.$.location;

          playData.plays.push(play);
        });
      }

      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(playData));
      res.send();
    } else {
      return setTimeout(function() {
        getBggCollection(req, res)
      }, 3000);
    }
  } catch (err) {
    console.log(err);
    console.trace();

    res.writeHead(500);
    res.write(err.message);
    res.send();
  }
});

module.exports = router;
