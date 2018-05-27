const express = require('express');
//const cookieSession = require('cookie-session');
var app = express();

var list = ["Faire les courses", "Nourrir le chat",
          "Arroser les plantes"];

// Opens database connection:
var dbc = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "notes"
});

// Set view engine to ejs.
.set("view engine", "ejs")

.get('/', function(req, res) {
  let currentList = getList();
  res.render('list',{
    list: currentList
  });
})

.get('/add', function(req, res) {
  var devoir = req.query.todo;  // Note query!
  addTask(devoir);
  res.redirect('/');
})

.get('/remove', function(req, res) {
  var id = req.query.id;  // Note query!
  removeTask(id);
  res.redirect('/');
})

// ... Tout le code de gestion des routes (app.get) se trouve au-dessus
/*app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/html');
    res.status(404).send('Page introuvable !');
});*/

.use(function(req, res, next){
    res.redirect('/');
})


.listen(8081);

// Makes a DB query and return an array containing all
// the wanted tasks:
var getList = function (connection){
  tasks = [];

  query = "Select * from notes " +
          " where done = 0 " +
          " order by modified";

  return tasks;
}

// Makes a DB query and return an array containing all
// the wanted tasks:
var removeTask = function (connection){
  tasks = [];

  query = "Select * from notes " +
          " where done = 0 " +
          " order by modified";

  return tasks;
}

// Makes a DB query and return an array containing all
// the wanted tasks:
var addTask = function (connection){
  tasks = [];

  query = "Select * from notes " +
          " where done = 0 " +
          " order by modified";

  return tasks;
}
