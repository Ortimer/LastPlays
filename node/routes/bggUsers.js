var express = require('express');
var getBggData = require('../bgg');
var router = express.Router();
var RateLimiter = require('limiter').RateLimiter;
var limiter = new RateLimiter(1, 750);

// Get bgg user data
router.get('/:username', function(req, res) {
  limiter.removeTokens(1, function() {
    var args = {
      'name': req.params.username
    }
    var bggUserPromise = getBggData('user', args);

    bggUserPromise
      .then(function(bggUserData) {
        bggUserData = bggUserData.data;

        var bggUser = {};
        bggUser.id = bggUserData.user.$.name;
        bggUser.firstName = bggUserData.user.firstname[0].$.value;
        bggUser.lastName = bggUserData.user.lastname[0].$.value;
        bggUser.avatarLink = 'http:' + bggUserData.user.avatarlink[0].$.value;

        bggUser = {
          'bggUser': bggUser
        };

        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        res.write(JSON.stringify(bggUser));
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
