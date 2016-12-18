var fs = require('fs');
var express = require("express");
var mysql   = require('mysql');
// var csvParser = require('papaparse');

var app     = express();
var PORT = 3000;

// var secrets = require("./secrets.json");

var sample_csv = "./sample_race_league.csv";

fs.readFile(sample_csv, 'utf8', function (err, data) {
  if (err) {return console.log(err);}

  //<editor-fold desc="split out parts of file">
  var sessionInfo = data.split("\r\n\r\n")[0];
  var leagueInfo = data.split("\r\n\r\n")[2];
  var results = data.split("\r\n\r\n")[3];
  //</editor-fold>

  var resultsArray = results.split("\n"); // split results into individual lines
  var params = resultsArray[0].substring(1);

  params = params.split('","'); // get the headers into it's own variable
  params[params.length - 1] = params[params.length - 1].substring(0, params[params.length - 1].length - 2); // cleaning up trash on end of string

  resultsArray.shift(); // get rid of the line that contains all the headers by dropping the first array element

  var objects = []; // this will contain the positions

  resultsArray.forEach(function (result) {
    var object = {};

    result = result.substring(1).split('","');
    // result = result.split('","');
    result[result.length - 1] = result[result.length - 1].substring(0, result[result.length - 1].length - 2); // cleaning up trash on end of string

    for(var i = 0; i < params.length; i++) {
      object[params[i]] = result[i];
    }
    objects.push(object);
  });


  console.log(objects);
});


// console.log("Server running on port " + PORT);
// app.listen(PORT);



/*
 var pool = mysql.createPool({
 connectionLimit: 100,
 host: 'jordanmalish.com',
 user: 'ppi_internal',
 password: secrets.sql,
 database: 'ppi_internal',
 debug: false
 });

 function handle_database(req, res, query) {
 pool.getConnection(function(err,connection){
 if (err) {
 res.json({"code" : 100, "status" : "Error in connection database"});
 return;
 }

 connection.on('error', function(err) {
 res.json({"code" : 100, "status" : "Error in connection database"});
 });

 connection.query(query, function(err,rows){
 connection.release();
 if(!err) {
 res.json(rows);
 }
 });
 });
 }

 app.get("/api/paperStocks", function(req,res){
 var query = "SELECT * FROM paper_stocks";

 handle_database(req, res, query);
 });

 app.get("/api/paperStocks/:id", function(req,res){
 var query = "SELECT * FROM paper_stocks where id = " + req.params.id;

 handle_database(req, res, query);
 });
 */


