var express = require('express');
var router = express.Router();

var menuTasks = [{
  'id': 1,
  'name': 'Task 1',
  'progress': 42,
  'barType': 'progress-bar-success'
}, {
  'id': 2,
  'name': 'Task 2',
  'progress': 15,
  'barType': 'progress-bar-info'
}, {
  'id': 3,
  'name': 'Task 3',
  'progress': 80,
  'barType': 'progress-bar-warning'
}, {
  'id': 4,
  'name': 'Task 4',
  'progress': 5,
  'barType': 'progress-bar-danger'
}];

// Get an expecific id
router.get('/:id', function(req, res) {
  var result = menuTasks.filter(function( obj ) {
    return obj.id == req.params.id;
  });

  if (result[0]) {
    var response = {
      'menuTask' : result[0]
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
