var request = require('urllib-sync').request;
var xml2js = require('xml2js');
var querystring = require('querystring');
var Q = require('q');

// BGG Function
module.exports = function(path, argsParameters) {
  var deferred = Q.defer();
  var parser = new xml2js.Parser();
  var bggUrl = 'http://www.boardgamegeek.com/xmlapi2/' + path + '?' + querystring.stringify(argsParameters);

  // Este código solo lo puse aquí para que no me joda esto en PSL
  // *** INICIO JODA PSL ***
  if (process.env.node_psl == 'true') {
    bggUrl =  {
      'host': '10.10.10.11',
      'port': 8080,
      'path': bggUrl
    };
  }
  // *** FIN JODA PSL ***

  var res = request(bggUrl);

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
