const express = require('express');
const mysql = require('mysql');

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
app.set("view engine", "ejs")

.get('/', function(req, res) {
  let currentList = getList(dbc);
  res.render('list',{
    list: currentList
  });
})

.get('/add', function(req, res) {
  var devoir = req.query.todo;  // Note query!
  addTask(dbc,devoir);
  res.redirect('/');
})

.get('/remove', function(req, res) {
  var id = req.query.id;  // Note query!
  removeTask(dbc,id);
  res.redirect('/');
})

// Tout le code de gestion des routes (app.get) se trouve au-dessus
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
  var tasks = [];

  var query = "Select * from notes " +
          " where done = 0 " +
          " order by modified";

  dbc.query(query, function (error, results, fields) {
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
    tasks = results;
  });

  return tasks;
}

// Makes a DB delete query and returns an error variable that
// is an Error if dbc.query encounteres one.
var removeTask = function (connection, id){
  var tasks = [];

  // This is a good way to escape query values:
  var rawQuery = "Delete from notes " +
                " where id = ?";
  var inserts = [id];
  var query = mysql.format(rawQuery, inserts);

  dbc.query(query, function (error, results, fields) {
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
    tasks = results;
  });

  return error;
}

// Makes a DB query and returns an error variable that
// is an Error if dbc.query encounteres one.
var addTask = function (connection, newTask){
  var d = new Date();
  var time = d.getTime(); // Created & modified

  var rawQuery = "Insert into notes " +
          " values(?, 0, ?, ?)";

  var inserts = [newTask, time, time];
  var query = mysql.format(rawQuery, inserts);

  dbc.query(query, function (error, results, fields) {
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
  });

  return error;
}

dbc.end();
