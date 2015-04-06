var express = require('express');
var app = express();

//Static resourses
app.use(express.static(__dirname + '/public', {
  'maxAge': 86400000
}));

// Funcion home
var home = function(req, res) {
  res.sendFile(__dirname + '/index.html');
};

// Routes
app.get('/', home);

// Menu routes
app.use('/menus', require('./node/routes/menus'));

// BGG routes
app.use('/bggUsers', require('./node/routes/bggUsers'));
app.use('/collections', require('./node/routes/bggGames'));
app.use('/plays', require('./node/routes/bggPlays'));

app.listen(process.env.PORT || 3000); //the port you want to use
