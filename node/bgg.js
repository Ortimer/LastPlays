var rest  = require('restling');
var restler  = require('restler');
var querystring = require('querystring');
var http = require('http');

// BGG Function
module.exports = function(path, argsParameters) {
  var bggUrl = 'http://www.boardgamegeek.com/xmlapi2/' + path + '?' + querystring.stringify(argsParameters);
  var options = {
    parser: restler.parsers.xml
  };

  return rest.get(bggUrl, options);
}
