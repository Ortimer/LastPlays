var express = require('express'),
	url = require('url'),
	http = require('http'),
	fs      = require('fs');
	bgg = require('bgg');
var app = express();

//Static resourses
app.use(express.static('./public'));

// Funcion home
var home = function (req, res) {
	res.sendfile('index.html');
};

var getXML = function(req, res){
	try {
		var url_params = url.parse(req.url, true);

		bgg(req.params.parameters, url_params.query).then(function(results){
			console.log('Request ended for ' + req.params.parameters + url_params.search);
			console.log('Request value: ' + JSON.stringify(results));
			res.writeHead(200, { 'Content-Type': 'application/json'});
			res.write(JSON.stringify(results));
			res.send();
		});
	} catch (ex) {
		console.log(ex);
	}
}

// Routes
app.get('/', home);
app.get('/plays/:bggUser', home);
app.get('/bggData/:parameters', getXML);

app.listen(process.env.PORT || 3000); //the port you want to use