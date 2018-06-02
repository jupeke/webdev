const express = require('express');
var mysql = require('mysql');

//const cookieSession = require('cookie-session');
var app = express();

// Opens database connection:
var dbc = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "notes"
});
dbc.connect();
//console.log('connected as id ' + dbc.threadId); Gives null...

// Set view engine to ejs.
app.set("view engine", "ejs")

.get('/', function(req, res) {
  getList(dbc, res, myCallback);
})

// This works as well. The callback function is anonymous
// which may be more difficult to read, but concise.
/*.get('/', function(req, res) {
  getList(dbc, res, function(err, currentList){
    if(err){
      throw err;
    }
    console.log("All togehter version");
    res.render('list',{
      list: currentList
    }); // end of res.render
  }); // end of getList
})*/  // end of get

.get('/add', function(req, res) {
  var devoir = req.query.todo;  // Note query!
  addTask(dbc,devoir);
  res.redirect('/');
})

.get('/remove', function(req, res) {
  var id = req.query.id;  // Note query!
  console.log("id="+id);
  removeTask(dbc,id, function(err, result){
    if(err){
      throw err;
      console.log("Error while removing task");
    } else{
      console.log("Task removed ok!");
    }
  }); // end of removeTask
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
// the wanted tasks. Note the use of a callback function!
var getList = function (connection, res, callback){

  var query = "Select id, task from todolist " +
          "where done = 0 " +
          "order by edited";
  console.log(query);
  connection.query(query, function (error, results, fields) {
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
    if (error){
      throw error;
      callback(error, false, res);
    } else{
      callback(null, results, res);
    }
  });
}

// Here the callback for the getList function. Made all
// the possible mistakes before figuring out the idea...
var myCallback = function(err, currentList, res){
  if(err){
    throw err;
  }
  console.log("currentList len ="+currentList.length);
  res.render('list',{
    list: currentList
  });
}

// Makes a DB delete query and returns an error variable that
// is an Error if dbc.query encounteres one.
var removeTask = function (connection, id, callb){
  var result = false;

  // This is a good way to escape query values:
  var rawQuery = "Delete from todolist " +
                "where id = ?";
  var inserts = [id];
  var query = mysql.format(rawQuery, inserts);

  connection.query(query, function (error, results, fields) {
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
    if (error){
      throw error;  // Meaning unclear.
      callb(error, false);
    } else{
      callb(null, results);
    }
  });

}

// Makes a DB query and returns an error variable that
// is an Error if dbc.query encounteres one.
var addTask = function (connection, newTask){
  var d = new Date();
  var time = d.getTime(); // Created & modified
  time = 123;
  var result = false;
  var rawQuery = "Insert into todolist (task, done, created, edited) " +
          "values(?,0,?,?)";

  var inserts = [newTask, time, time];
  var query = mysql.format(rawQuery, inserts);
  console.log(query);

  dbc.query(query, function (error, results, fields) {
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
    result = error;

  });
}

//dbc.end();
