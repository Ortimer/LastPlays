var express = require('express');
var getBggData = require('../bgg');
var router = express.Router();

router.get('/:username', function(req, res) {
  try {
    var getBggCollection = function(req, res) {
      var args = {
        'username': req.params.username,
        'own': 1,
        'excludesubtype': 'boardgameexpansion',
        'played': 1
      }
      var bggCollectionData = getBggData('collection', args);

      var collectionData = {
        'id': req.params.username,
        'games': []
      }

      if (bggCollectionData.items) {
        if (bggCollectionData.items.item) {
          bggCollectionData.items.item.forEach(function(item, index) {
            var game = {};

            game.id = item.$.objectid;
            game.collection_id = req.params.username;
            game.bggUrl = 'https://www.boardgamegeek.com/boardgame/' + item.$.objectid;
            game.name = item.name[0]._;
            game.image = 'http:' + item.thumbnail[0];
            game.totalPlays = item.numplays[0];
            game.plays = item.$.objectid;

            collectionData.games.push(game);
          });
        }

        collectionData = {
          'collection': collectionData
        };

        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        res.write(JSON.stringify(collectionData));
        res.send();
      } else {
        return setTimeout(function() {
          getBggCollection(req, res)
        }, 3000);
      }
    }
    getBggCollection(req, res);
  } catch (err) {
    console.log(err);
    console.trace();

    res.writeHead(500);
    res.write(err.message);
    res.send();
  }
});

module.exports = router;
