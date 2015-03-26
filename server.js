var express = require('express');
var url = require('url');
var http = require('http');
var fs = require('fs');
var bgg = require('bgg');
var app = express();


//Static resourses
app.use(express.static(__dirname + "/public", {
  maxAge: 86400000
}));

// Funcion home
var home = function(req, res) {
  res.sendFile(__dirname + '/index.html');
};

var getData = function(req, res) {
  var url_params = url.parse(req.url, true);

  bgg(req.params.parameters, url_params.query).then(function(results) {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    },
    function(error) {
      console.log(error);
    });
    res.write(JSON.stringify(results));
    res.send();
  });
}

var getMenu = function(req, res) {
  var menu = {
    messages: [
      {
        author: "John Smith",
        time: "Yesterday",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend..."
      },
      {
        author: "John Doe",
        time: "3 days ago",
        message: "Bacon ipsum dolor amet porchetta flank turducken, pork belly beef ribs bresaola chuck swine beef turkey jerky picanha leberkas..."
      }
    ],
    tasks: [
      {
        name: "Task 1",
        progress: 42,
        barType: "progress-bar-success"
      },
      {
        name: "Task 2",
        progress: 15,
        barType: "progress-bar-info"
      },
      {
        name: "Task 3",
        progress: 80,
        barType: "progress-bar-warning"
      },
      {
        name: "Task 4",
        progress: 5,
        barType: "progress-bar-danger"
      }
    ],
    sideMenuOptions: [
      {
        name: "Last plays",
        icon: "fa-gamepad",
        link: "#"
      },
      {
        name: "Charts",
        icon: "fa-bar-chart-o",
        link: "#",
        subMenus: [
          {
            name: "Owned games by year",
            link: "#"
          },
          {
            name: "Plays by month",
            link: "#"
          }
        ]
      },
      {
        name: "Tables",
        icon: "fa-table",
        link: "#"
      },
      {
        name: "Stats",
        icon: "fa-pie-chart",
        link: "#",
        subMenus: [
          {
            name: "H-Index",
            link: "#"
          },
          {
            name: "Money spend",
            link: "#"
          }
        ]
      }
    ]
  };

  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.write(JSON.stringify(menu));
  res.send();
}

// Routes
app.get('/', home);
app.get('/menuInfo', getMenu);
app.get('/plays/:bggUser', home);
app.get('/bggData/:parameters', getData);

bgg('user', {name: 'arael'}).then(
  function(response) {
    console.log('response: ', response);
  },
  function(response) {
    console.error('response error: ', response);
  }
);

app.listen(process.env.PORT || 3000); //the port you want to use
