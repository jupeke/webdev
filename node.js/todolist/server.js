const express = require('express');
const cookieSession = require('cookie-session');
var app = express();

var list = ["Faire les courses", "Nourrir le chat",
          "Arroser les plantes"];

app.use(cookieSession({
  nam: 'session',
  keys: ['key1','key2'] // Meaning unsure..
}));

// Set view engine to ejs.
app.set("view engine", "ejs");

app.get('/', function(req, res) {
  if(isNaN(req.session.list)){
    req.session.list = list;
  }
  let currentList = req.session.list;
  res.render('list',{
    list: currentList
  });
});

app.get('/add', function(req, res) {
  var devoir = req.query.todo;  // Note query!
  req.session.list.push(devoir);
  res.render('list',{
    list: req.session.list
  });
});

// ... Tout le code de gestion des routes (app.get) se trouve au-dessus
app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/html');
    res.status(404).send('Page introuvable !');
});

// Removes one element with given id from the given array (=list).
// Removes also the corresponding html element.
var remove = function(id){

  var elem = document.getElementById(id);
  var parent = elem.parentNode;
  parent.removeChild(elem);

  //return list.splice(id,1);
}

app.listen(8081);
