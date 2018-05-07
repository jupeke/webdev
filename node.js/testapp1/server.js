var http = require('http');
var url = require('url');
var querystring = require('querystring');

// Same as separately:
// var server = http.createServer();
// server.on('request', function(requ, resu){...});
var server = http.createServer(function(requ, resu) {
  var page = url.parse(requ.url).pathname;
  var query = url.parse(requ.url).query;
  var params = querystring.parse(query);

  console.log(page);
  resu.writeHead(200, {"Content-Type": "text/plain"});
  if (page == '/') {
      resu.write('Vous êtes à l\'accueil, que puis-je pour vous ?');
  }
  else if (page == '/sous-sol') {
      resu.write('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
  }
  else if (page == '/prive') {
      resu.write('Hé ho, c\'est privé ici ! ');
      if('prenom' in params && 'nom' in params){
        resu.write('Vous vous appelez '+params['prenom'] + ' ' +params['nom']);
      }else{

        resu.write('Vous devez bien avoir un nom, non ?');
      }
  }
  var params = querystring.parse(url.parse(requ.url).query);
  resu.end();
});

server.on('close', function(){
  console.log("Moro vaa!");
})
server.listen(8081); // Starts the server.

//server.close();   // Stops the server.
