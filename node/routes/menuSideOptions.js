var express = require('express');
var router = express.Router();

var menuSideOptions = [{
  'id': 1,
  'name': 'Last plays',
  'icon': 'fa-gamepad',
  'link': 'javascript:void(0)'
}, {
  'id': 2,
  'name': 'Charts',
  'icon': 'fa-bar-chart-o',
  'link': 'javascript:void(0)',
  'subMenus': [1, 2]
}, {
  'id': 3,
  'name': 'Tables',
  'icon': 'fa-table',
  'link': 'javascript:void(0)'
}, {
  'id': 4,
  'name': 'Stats',
  'icon': 'fa-pie-chart',
  'link': 'javascript:void(0)',
  'subMenus': [3, 4]
}];

// Get an expecific id
router.get('/:id', function(req, res) {
  var result = menuSideOptions.filter(function(obj) {
    return obj.id == req.params.id;
  });

  if (result[0]) {
    var response = {
      'menuSideOption': result[0]
    }


    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(response));
    res.send();
  } else {
    res.writeHead(404);
    res.write("Data not found");
    res.send();
  }
});

module.exports = router;
