var express = require('express');
var router = express.Router();

var menuSideSubs = [{
  'id': 1,
  'name': 'Owned games by year',
  'link': 'javascript:void(0)'
}, {
  'id': 2,
  'name': 'Plays by month',
  'link': 'javascript:void(0)'
},{
  'id': 3,
  'name': 'H-Index',
  'link': 'javascript:void(0)'
}, {
  'id': 4,
  'name': 'Money spend',
  'link': 'javascript:void(0)'
}];

// Get an expecific id
router.get('/:id', function(req, res) {
  var result = menuSideSubs.filter(function( obj ) {
    return obj.id == req.params.id;
  });

  if (result[0]) {
    var response = {
      'menuSideSub' : result[0]
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
