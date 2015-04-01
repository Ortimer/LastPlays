var express = require('express');
var url = require('url');
var http = require('http');
var fs = require('fs');
var app = express();
var request = require('urllib-sync').request;
var xml2js = require('xml2js');
var querystring = require('querystring');
var Q = require('q');

//Static resourses
app.use(express.static(__dirname + '/public', {
  'maxAge': 86400000
}));

// BGG Function
var getBggData = function(path, argsParameters) {
  var deferred = Q.defer();
  var parser = new xml2js.Parser();
  var url = 'http://www.boardgamegeek.com/xmlapi2/' + path + '?' + querystring.stringify(argsParameters);
  var res = request(url);

  if (res.status != 200) {
    return new Error('There was an error in the request to BGG', res);
  }

  parser.parseString(res.data.toString(), function(err, stdout, stderr) {
    if (err) {
      return deferred.reject(err);
    }
    return deferred.resolve(stdout);
  });
  return deferred.promise.valueOf();
}

// Funcion home
var home = function(req, res) {
  res.sendFile(__dirname + '/index.html');
};

var getMenu = function(req, res) {
  var menu = {
    'messages': [{
      'author': 'John Smith',
      'time': 'Yesterday',
      'message': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...'
    }, {
      'author': 'John Doe',
      'time': '3 days ago',
      'message': 'Bacon ipsum dolor amet porchetta flank turducken, pork belly beef ribs bresaola chuck swine beef turkey jerky picanha leberkas...'
    }],
    'tasks': [{
      'name': 'Task 1',
      'progress': 42,
      'barType': 'progress-bar-success'
    }, {
      'name': 'Task 2',
      'progress': 15,
      'barType': 'progress-bar-info'
    }, {
      'name': 'Task 3',
      'progress': 80,
      'barType': 'progress-bar-warning'
    }, {
      'name': 'Task 4',
      'progress': 5,
      'barType': 'progress-bar-danger'
    }],
    'sideMenuOptions': [{
      'name': 'Last plays',
      'icon': 'fa-gamepad',
      'link': '#'
    }, {
      'name': 'Charts',
      'icon': 'fa-bar-chart-o',
      'link': '#',
      'subMenus': [{
        'name': 'Owned games by year',
        'link': '#'
      }, {
        'name': 'Plays by month',
        'link': '#'
      }]
    }, {
      'name': 'Tables',
      'icon': 'fa-table',
      'link': '#'
    }, {
      'name': 'Stats',
      'icon': 'fa-pie-chart',
      'link': '#',
      'subMenus': [{
        'name': 'H-Index',
        'link': '#'
      }, {
        'name': 'Money spend',
        'link': '#'
      }]
    }]
  };

  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.write(JSON.stringify(menu));
  res.send();
}

var getBggUser = function(req, res) {
  try {
    var bggUser = {};
    var bggUserData = getBggData('user', req.query);

    bggUser.username = bggUserData.user.$.name;

    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(bggUser));
    res.send();
  } catch (err) {
    res.writeHead(500);
    res.write(err.message);
    res.send();
  }
}

var getBggPlays = function(req, res) {
  try {
    var collectionData = {
      'collection': []
    };
    var bggCollectionData = getBggData('collection', req.query);

    if (bggCollectionData.items) {
      bggCollectionData.items.item.forEach(function(item, index) {
        var game = {};

        game.id = item.$.objectid;
        game.bggUrl = 'https://www.boardgamegeek.com/boardgame/' + item.$.objectid;
        game.name = item.name[0]._;
        game.image = item.thumbnail[0];
        game.totalPlays = item.numplays[0];

        if (game.totalPlays > 0) {
          var playsParams = {
            'username': req.query.username,
            'id': item.$.objectid
          };
          var bggPlaysData = getBggData('plays', playsParams);

          game.lastplay = bggPlaysData.plays.play[0].$.date;
        }

        collectionData.collection.push(game);
      });

      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(collectionData));
      res.send();
    } else {
      return setTimeout(function() {
        getBggPlays(req, res)
      }, 3000);
    }
  } catch (err) {
    res.writeHead(500);
    res.write(err.message);
    res.send();
  }
}

// Routes
app.get('/', home);
app.get('/menuInfo', getMenu);
app.get('/bggUser', getBggUser);
app.get('/bggPlays', getBggPlays);

app.listen(process.env.PORT || 3000); //the port you want to use
