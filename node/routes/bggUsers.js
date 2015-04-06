var express = require('express');
var getBggData = require('../bgg');
var router = express.Router();

// Get bgg user data
router.get('/:username', function(req, res) {
  var args = {
    'name': req.params.username
  }
  var bggUserData = getBggData('user', args);

  bggUserData
    .then(function(bggUserData) {
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
    })
    .catch(function(err) {
      console.log(err);
      console.trace();

      res.writeHead(500);
      res.write(err.message);
      res.send();
    });
});

module.exports = router;
