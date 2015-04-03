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
app.use('/collections', require('./node/routes/bggGames'));
app.use('/plays', require('./node/routes/bggPlays'));

app.listen(process.env.PORT || 3000); //the port you want to use
