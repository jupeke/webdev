var express = require('express');
var app = express();

// Set view engine to ejs.
app.set("view engine", "ejs");

app.get('/', function(req, res) {
  let list = ["Faire les courses", "Nourrir le chat",
            "arroser les plantes"];
  res.render('list',{
    list: list;
  });
});

// ... Tout le code de gestion des routes (app.get) se trouve au-dessus
app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/html');
    res.status(404).send('Page introuvable !');
});

app.listen(8081);
