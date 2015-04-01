var express = require('express');
var app = express();

//Static resourses
app.use(express.static(__dirname + '/public', {
  'maxAge': 86400000
}));

var useProxy = false;

if (process.argv[2] != null && process.argv[2].toLowerCase() == 'proxy') {
  useProxy = true;
}

// Funcion home
var home = function(req, res) {
  res.sendFile(__dirname + '/index.html');
};

// Routes
app.get('/', home);

// Menu routes
app.use('/menuInfos', require('./node/routes/menuInfos'));
app.use('/menuMessages', require('./node/routes/menuMessages'));
app.use('/menuTasks', require('./node/routes/menuTasks'));
app.use('/menuSideOptions', require('./node/routes/menuSideOptions'));
app.use('/menuSideSubs', require('./node/routes/menuSideSubs'));

// BGG routes
app.use('/bggUsers', require('./node/routes/bggUsers'));

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
    console.log(err);
    console.trace();

    res.writeHead(500);
    res.write(err.message);
    res.send();
  }
}
app.get('/bggPlays', getBggPlays);

app.listen(process.env.PORT || 3000); //the port you want to use
