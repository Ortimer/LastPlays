var express = require('express');
var router = express.Router();

var menuInfos = [{
  'id': 1,
  'messages': [1, 2],
  'tasks': [1, 2, 3, 4],
  'sideMenuOptions': [1, 2, 3, 4]
}];


// Get all items
router.get('/', function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.write(JSON.stringify({
    'menuInfos': menuInfos
  }));
  res.send();
});

// Get an expecific id
router.get('/:id', function(req, res) {
  var result = menuInfos.filter(function(obj) {
    return obj.id == req.params.id;
  });

  if (result[0]) {
    var response = {
      'menuInfo': result[0]
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
