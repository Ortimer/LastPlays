var express = require('express');
var getBggData = require('../bgg');
var router = express.Router();
var RateLimiter = require('limiter').RateLimiter;
var limiter = new RateLimiter(1, 650);

router.get('/', function(req, res) {
  var getBggCollection = function(req, res, retry) {
    if (req.query.username == null) {
      res.writeHead(400);
      res.write('No username defined');
      res.send();
      return;
    }

    if (retry >= 5) {
      res.writeHead(500);
      res.write('Retry limit reached');
      res.send();
      return;
    }

    var args = {
      'username': req.query.username,
      'stats': 1,
      'excludesubtype': 'boardgameexpansion'
    }

    if (req.query.own) {
      args.own = req.query.own;
    }

    if (req.query.played) {
      args.played = req.query.played;
    }

    var bggCollectionPromise = getBggData('collection', args);

    bggCollectionPromise.then(function(bggCollectionData) {
      bggCollectionData = bggCollectionData.data;

      var collectionData = {};
      collectionData[req.baseUrl.substring(1)] = [];

      if (bggCollectionData.items) {
        if (bggCollectionData.items.item) {
          bggCollectionData.items.item.forEach(function(item, index) {
            var game = {};

            game.id = item.$.objectid;
            game.bggUrl = 'http://www.boardgamegeek.com/boardgame/' + item.$.objectid;
            game.name = item.name[0]._;
            game.image = 'http:' + item.thumbnail[0];
            game.totalPlays = item.numplays[0];
            game.yearpublished = item.yearpublished[0];
            game.minplayers = item.stats[0].$.minplayers;
            game.maxplayers = item.stats[0].$.maxplayers;
            game.playingtime = item.stats[0].$.playingtime;
            game.numowned = item.stats[0].$.numowned;
            game.rating = item.stats[0].rating[0].$.value;
            game.ratingBgg = item.stats[0].rating[0].average[0].$.value;
            game.lastPlay_id = req.query.username + '-' + item.$.objectid;

            collectionData[req.baseUrl.substring(1)].push(game);
          });
        }

        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        res.write(JSON.stringify(collectionData));
        res.send();
      } else {
        return setTimeout(function() {
          limiter.removeTokens(1, function() {
            getBggCollection(req, res, retry + 1)
          });
        }, 3000);
      }
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
  }
  limiter.removeTokens(1, function() {
    getBggCollection(req, res, 0);
  });
});

module.exports = router;
