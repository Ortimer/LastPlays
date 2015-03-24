var express = require('express');
var url = require('url');
var http = require('http');
var fs = require('fs');
//var bgg = require('bgg');
var app = express();

//Static resourses
app.use(express.static(__dirname + "/public", {
  maxAge: 86400000
}));

// Funcion home
var home = function(req, res) {
  res.sendFile(__dirname + '/index.html');
};

var getXML = function(req, res) {
  try {
    var url_params = url.parse(req.url, true);

    /*bgg(req.params.parameters, url_params.query).then(function(results) {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(results));
      res.send();
    });*/
  } catch (ex) {
    console.log(ex);
  }
}

// Routes
app.get('/', home);
app.get('/plays/:bggUser', home);
app.get('/bggData/:parameters', getXML);

app.listen(process.env.PORT || 3000); //the port you want to use
