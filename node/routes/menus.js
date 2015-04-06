var express = require('express');
var router = express.Router();

var menuInfos = [{
  id: 1,
  messages: [{
    id: 1,
    author: 'John Smith',
    time: 'Yesterday',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...'
  }, {
    id: 2,
    author: 'John Doe',
    time: '3 days ago',
    message: 'Bacon ipsum dolor amet porchetta flank turducken, pork belly beef ribs bresaola chuck swine beef turkey jerky picanha leberkas...'
  }],
  tasks: [{
    id: 1,
    name: 'Task 1',
    progress: 42,
    barType: 'progress-bar-success'
  }, {
    id: 2,
    name: 'Task 2',
    progress: 15,
    barType: 'progress-bar-info'
  }, {
    id: 3,
    name: 'Task 3',
    progress: 80,
    barType: 'progress-bar-warning'
  }, {
    id: 4,
    name: 'Task 4',
    progress: 5,
    barType: 'progress-bar-danger'
  }],
  sideMenuOptions: [{
    id: 1,
    name: 'Last plays',
    icon: 'fa-gamepad',
    link: 'javascript:void(0)'
  }, {
    id: 2,
    name: 'Charts',
    icon: 'fa-bar-chart-o',
    link: 'javascript:void(0)',
    subMenus: [{
      id: 1,
      name: 'Owned games by year',
      link: 'javascript:void(0)'
    }, {
      id: 2,
      name: 'Plays by month',
      link: 'javascript:void(0)'
    }]
  }, {
    id: 3,
    name: 'Tables',
    icon: 'fa-table',
    link: 'javascript:void(0)'
  }, {
    id: 4,
    name: 'Stats',
    icon: 'fa-pie-chart',
    link: 'javascript:void(0)',
    subMenus: [{
      id: 3,
      name: 'H-Index',
      link: 'javascript:void(0)'
    }, {
      id: 4,
      name: 'Money spend',
      link: 'javascript:void(0)'
    }]
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
