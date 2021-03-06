var express = require('express');
var router = express.Router();

var menuInfos = [{
  id: 1,
  sideMenuOptions: [{
    id: 1,
    name: 'Last plays',
    icon: 'fa-gamepad',
    link: 'bgguser.lastplays'
  }, {
    id: 2,
    name: 'H-Index',
    icon: 'fa-pie-chart',
    link: 'bgguser.hindex'
  }, {
    id: 3,
    name: 'Graphs',
    icon: 'fa-bar-chart',
    link: 'bgguser.graphs'
  }]
}];

// Get an expecific id
router.get('/:id', function(req, res) {
  var result = menuInfos.filter(function(obj) {
    return obj.id == req.params.id;
  });

  if (result[0]) {
    var response = {
      'menu': result[0]
    }


    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(response));
    res.send();
  } else {
    res.writeHead(404);
    res.write("Menu not found");
    res.send();
  }
});

module.exports = router;
