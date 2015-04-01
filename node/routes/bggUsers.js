var express = require('express');
var getBggData = require('../bgg');
var router = express.Router();

// Get an expecific id
router.get('/:username', function(req, res) {
  try {
    var args = {
      'name': req.params.username
    }
    var bggUserData = getBggData('user', args);

    var bggUser = {};
    bggUser.userName = bggUserData.user.$.name;
    bggUser.firstName = bggUserData.user.firstname[0].$.value;
    bggUser.lastName = bggUserData.user.lastname[0].$.value;
    bggUser.avatarLink = 'http:' + bggUserData.user.avatarlink[0].$.value;

    bggUser = {
      "bggUser": bggUser
    };

    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(bggUser));
    res.send();
  } catch (err) {
    console.log(err);
    console.trace();

    res.writeHead(500);
    res.write(err.message);
    res.send();
  }
});


module.exports = router;
