var express = require('express');
var router = express.Router();

var menuMessages = [{
  'id': 1,
  'author': 'John Smith',
  'time': 'Yesterday',
  'message': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...'
}, {
  'id': 2,
  'author': 'John Doe',
  'time': '3 days ago',
  'message': 'Bacon ipsum dolor amet porchetta flank turducken, pork belly beef ribs bresaola chuck swine beef turkey jerky picanha leberkas...'
}];

// Get an expecific id
router.get('/:id', function(req, res) {
  var result = menuMessages.filter(function(obj) {
    return obj.id == req.params.id;
  });

  if (result[0]) {
    var response = {
      'menuMessage': result[0]
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
