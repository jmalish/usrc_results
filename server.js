var http = require('http');
var fs = require('fs');
var express = require("express");
var mysql   = require('mysql');
var bodyparser = require('body-parser');

var app     = express();
var PORT = 3000;

app.use('/node_modules', express.static(__dirname + '/node_modules'))
  .use(express.static(__dirname + '/public'))
  .use(bodyparser.urlencoded({ extended: true}))
  .use(bodyparser.json);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// var secrets = require("./secrets.json");
//
// var pool = mysql.createPool({
//     connectionLimit: 100,
//     host: 'jordanmalish.com',
//     user: 'usrc_results',
//     password: secrets.sql,
//     database: 'usrc_results',
//     debug: false
// });
//
// function select_from_database(req, res, query) {
//     pool.getConnection(function(err,connection){
//         if (err) {
//             res.json({"code" : 100, "status" : "Error in connection database"});
//             return;
//         }
//
//         connection.on('error', function(err) {
//             res.json({"code" : 100, "status" : "Error in connection database"});
//         });
//
//         connection.query(query, function(err,rows){
//             connection.release();
//             if(!err) {
//                 res.json(rows);
//             }
//         });
//     });
// }
//
// function insert_to_database(query) {
//     pool.getConnection(function(err,connection){
//         if (err) {
//             console.error(err);
//             return;
//         }
//
//         connection.on('error', function(err) {
//             console.error(err);
//         });
//
//         connection.query(query, function(err,rows){
//             connection.release();
//             if(err) console.error(err);
//         });
//     });
// }

var sampleCSV = "./eventresult_18350908.csv"; // 50908 = league race | 76441 = official race

fs.readFile(sampleCSV, 'utf8', function (err, data) {
    // <editor-fold desc="non sql stuff">
    if (err) return console.log(err);

    var sessionID = sampleCSV.split('_')[1].split('.')[0];  // TODO: change sampleCSV var to whatever it's called later

    var sessionInfo = data.split("\r\n\n")[0];
    var leagueInfo = data.split("\r\n\n\n\n")[1].split("\n\n")[0];
    var results = data.split("\r\n\n\n\n")[1].split("\n\n")[1];

    if ((sessionID.length != 8) || results == undefined) { // file was either renamed, or is not going to fit our needed format
        console.error("File name changed or incorrect session type.");
        // return;
    }

    var resultsArray = results.split("\n"); // split results into individual lines
    var params = resultsArray[0].substring(1);

    params = params.split('","'); // get the headers into it's own variable
    params[params.length - 1] = params[params.length - 1].substring(0, params[params.length - 1].length - 2); // cleaning up trash on end of string

    resultsArray.shift(); // get rid of the line that contains all the headers by dropping the first array element

    var objects = []; // this will contain the positions

    resultsArray.forEach(function (result) {
      var object = {};

      result = result.substring(1).split('","');
      result[result.length - 1] = result[result.length - 1].substring(0, result[result.length - 1].length - 2); // cleaning up trash on end of string

      for(var i = 0; i < params.length; i++) {
        object[params[i]] = result[i];
      }

      if (object.Car != undefined) objects.push(object); // make sure we don't get any blank lines
    });
    // </editor-fold desc="non sql stuff">



    // var query = "INSERT INTO `usrc_results`.`testing` (`test_one`, `test_two`) VALUES ('a', 'b');";
    //
    // insert_to_database(query);

    console.log();
});


// <editor-fold desc="Web Pages">
app.get('/', function(req, res) {
  res.sendFile('index');
});
// </editor-fold>



console.log("Server running on port " + PORT);
app.listen(PORT);

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
