var express = require('express'),
	url = require('url'),
	http = require('http'),
	fs      = require('fs');
var app = express();

//Static resourses
app.use(express.static('./public'));

// Funcion home
var home = function (req, res) {
	res.sendfile('index.html');
};

var getXML = function(req, res){
	var str = '';
	var options = {
		host: 'boardgamegeek.com',
		path: '/xmlapi2/' + req.params.parameters + url.parse(req.url, true).search,
		headers: {
			'Content-Type': 'text/xml'
		}
	};

	var callback = function(response) {
		str = '';

		//another chunk of data has been recieved, so append it to `str`
		response.on('data', function (chunk) {
			str += chunk;
		});

		response.on('end', function () {
			res.writeHead(200, { 'Content-Type': 'text/xml'});
			res.write(str);
			res.send();
		});
	}

	http.request(options, callback).end();
}

// Routes
app.get('/', home);
app.get('/loading.html', function (req, res) {
	res.sendfile('loading.html');
});
app.get('/plays/:bggUser', home);
app.get('/bggData/:parameters', getXML);

app.listen(process.env.PORT || 3000); //the port you want to use