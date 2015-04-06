var querystring = require('querystring');
var Promise = require("bluebird");
var xml2js = require('xml2js');
var Client = Promise.promisifyAll(require('node-rest-client').Client);

// BGG Function
module.exports = function(path, argsParameters) {
  var parser = new xml2js.Parser();
  var bggUrl = 'http://www.boardgamegeek.com/xmlapi2/' + path + '?' + querystring.stringify(argsParameters);
  var client = new Client();

  // Este código solo lo puse aquí para que no me joda esto en PSL
  // *** INICIO JODA PSL ***
  if (process.env.node_psl == 'true') {
    bggUrl = {
      'host': '10.10.10.11',
      'port': 8080,
      'path': bggUrl
    };
  }
  // *** FIN JODA PSL ***

  return client.getAsync(bggUrl).then(parser.parseString);
}
