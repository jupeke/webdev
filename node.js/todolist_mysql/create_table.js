var mysql = require('mysql');
var query = "create table todolist (" +
            " id int auto_increment not null," +
            " task varchar(100) not null," +
            " done tinyint default 0," +
            " created int not null," +
            " edited int not null," +
            " primary key (id)," +
            " index(done)," +
            " index(created)," +
            " index(edited)" +
            ") ENGINE=INNODB";

//var query =
//  "create table todolist ENGINE=INNODB;"

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "notes"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query(query, function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});
