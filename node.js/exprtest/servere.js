var express = require('express');

var app = express();

// To use debug instead of console.log:
var debug = require('debug')('http')
  , http = require('http')
  , name = 'ServerWithExpress';

debug('booting %s', name);

// Set view engine to ejs.
app.set("view engine", "ejs");

// Tell Express where we keep our index.ejs ( not needed when
// the default used like here)
// app.set("views", __dirname + "/views");

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Vous êtes à l\'accueil avec Express, mon pote !');
});

app.get('/sous-sol', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
});

// This is important: how to manage the style of route and
// to call a template HTML in another file. Note: res.setHeader
// is not needed.
app.get('/etage/:etagenum/chambre/:chambrenum', function(req, res) {
  let chanum = parseInt(req.params.chambrenum);
  let etanum = parseInt(req.params.etagenum);
  let warning = "";

  // Note: isInteger didn't work here, returned undefined
  if(isNaN(chanum)){
    warning = "Le numero de chambre n'est pas un numero!";
  }
  if(isNaN(etanum)){
    warning += " Le numero d'etage n'est pas un numero!";
  }
  if(warning === ""){
    warning = "Tout en ordre!";
  }
  res.render('chambre',{
    etage: req.params.etagenum,
    chambre: req.params.chambrenum,
    warning: warning
  });
});


// ... Tout le code de gestion des routes (app.get) se trouve au-dessus
app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/html');
    res.status(404).send('Page introuvable !');
});

app.listen(8081);
