var express = require('express');
var url = require('url');
var http = require('http');
var fs = require('fs');
var app = express();
var Client = require('node-rest-client').Client;
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

// configure proxy
var options_proxy = {};

if (process.argv[2] != null && process.argv[2].toLowerCase() == 'proxy') {
  options_proxy = {
    proxy:{
      host:'10.10.10.11',
      port:8080,
      tunnel:false
    }
  };
}

//Static resourses
app.use(express.static(__dirname + '/public', {
  maxAge: 86400000
}));

// BGG Function
var getBggData = function(path, argsParameters, callbackFunction) {
  var client = new Client(options_proxy);

  // set content-type header and data as json in args parameter
  var args = {
    parameters:argsParameters
  };

  // direct way
  client.get('http://www.boardgamegeek.com/xmlapi2/' + path, args, function(data, response){
    // parsed response body as js object
    parser.parseString(data, function (err, result) {
      if (err) {
        console.log(err);
      }
      callbackFunction(result);
    });
  });
}

// Funcion home
var home = function(req, res) {
  res.sendFile(__dirname + '/index.html');
};

var getMenu = function(req, res) {
  var menu = {
    messages: [
      {
        author: 'John Smith',
        time: 'Yesterday',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...'
      },
      {
        author: 'John Doe',
        time: '3 days ago',
        message: 'Bacon ipsum dolor amet porchetta flank turducken, pork belly beef ribs bresaola chuck swine beef turkey jerky picanha leberkas...'
      }
    ],
    tasks: [
      {
        name: 'Task 1',
        progress: 42,
        barType: 'progress-bar-success'
      },
      {
        name: 'Task 2',
        progress: 15,
        barType: 'progress-bar-info'
      },
      {
        name: 'Task 3',
        progress: 80,
        barType: 'progress-bar-warning'
      },
      {
        name: 'Task 4',
        progress: 5,
        barType: 'progress-bar-danger'
      }
    ],
    sideMenuOptions: [
      {
        name: 'Last plays',
        icon: 'fa-gamepad',
        link: '#'
      },
      {
        name: 'Charts',
        icon: 'fa-bar-chart-o',
        link: '#',
        subMenus: [
          {
            name: 'Owned games by year',
            link: '#'
          },
          {
            name: 'Plays by month',
            link: '#'
          }
        ]
      },
      {
        name: 'Tables',
        icon: 'fa-table',
        link: '#'
      },
      {
        name: 'Stats',
        icon: 'fa-pie-chart',
        link: '#',
        subMenus: [
          {
            name: 'H-Index',
            link: '#'
          },
          {
            name: 'Money spend',
            link: '#'
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

var getBggUser = function(req, res) {
  getBggData('user', req.query, function (data) {
    var bggUser = {};

    bggUser.username = data.user.$.name;

    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(bggUser));
    res.send();
  });
}

var getBggPlays = function(req, res) {
  getBggData('collection', req.query, function (data) {
    var collectionData = {
      collection: []
    };

    if(data.message != null){
      setTimeout(function() {
        getBggPlays(req, res);
      }, 3000);
    }else{

      data.items.item.forEach(function(item){
        var game = {};

        game.bggUrl = 'https://www.boardgamegeek.com/boardgame/' + item.$.objectid;
        game.name = item.name[0]._;
        game.image = item.thumbnail[0];

        collectionData.collection.push(game);
      });

      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(collectionData));
      res.send();
    }
  });
}

// Routes
app.get('/', home);
app.get('/menuInfo', getMenu);
app.get('/bggUser', getBggUser);
app.get('/bggPlays', getBggPlays);

app.listen(process.env.PORT || 3000); //the port you want to use
