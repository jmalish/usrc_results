var http = require('http');
var express = require("express");
var bodyparser = require('body-parser');
var formidable = require('formidable');
var sql = require('./public/js/sql');

var app     = express();
var PORT = 3000;

app.use('/node_modules', express.static(__dirname + '/node_modules'))
    .use(express.static(__dirname + '/public/'))
    .use(bodyparser.json(null));

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.get('/', function(req, res) {
    // points to index no matter what, not sure if that's how node works or I did something wrong
});

app.get('/upload', function (req, res) {
    res.sendFile('uploadNewRace.html', { root: __dirname + "/public/" });
});

app.post('/upload', function (req, res){
    var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/public/uploads/' + file.name; // TODO: check to make sure filename is correct format, should probably use regex
    });                                                         // eventresult_17576441.csv is correct format

    form.on('file', function (name, file){
        // this is run when the file is completed downloading... I think
    });

    res.send("blah");
});
// </editor-fold desc="Front end pages>

// <editor-fold desc="api pages">
app.get("/api/results", function(req,res){
    var query = "SELECT * FROM results";

    sql.selectFromDatabase(req, res, query);
});

app.get("/api/results/:carId", function(req,res){
    var query = "SELECT * FROM results where carId = " + req.params.carId;

    sql.selectFromDatabase(req, res, query);
});
// </editor-fold desc="api pages">


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
