var express = require('express');

var app = express();

// To use debug instead of console.log:
var debug = require('debug')('http')
  , http = require('http')
  , name = 'ServerWithExpress';

debug('booting %s', name);


app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Vous êtes à l\'accueil avec Express, mon pote !');
});

app.get('/sous-sol', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
});

app.get('/etage/:etagenum', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à l\'étage n°' + req.params.etagenum);
});
debug('la chambre de l\'étage n° je ne sais pas.');

// ... Tout le code de gestion des routes (app.get) se trouve au-dessus
app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

app.listen(8081);
