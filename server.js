"use strict";
var fs = require("fs");
var express = require("express");
var bodyParser = require("body-parser");
var formidable = require("formidable");
var mysql = require("mysql");
var sql_1 = require("./public/js/sql");
var csv_to_db_1 = require("./public/js/csv-to-db");
var app = express();
var PORT = 3000;
app.use('/node_modules', express.static(__dirname + '/node_modules'))
    .use('/app', express.static(__dirname + '/app'))
    .use('/html', express.static(__dirname + '/app/html'))
    .use('/css', express.static(__dirname + '/app/css'))
    .use(express.static(__dirname + '/public/'))
    .use(bodyParser.json(null));
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname + "/public/" });
});
app.get('/upload', function (req, res) {
    res.sendFile('uploadNewRace.html', { root: __dirname + "/public/" });
});
app.post('/upload', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req);
    form.on('fileBegin', function (name, file) {
        var uploadsDir = __dirname + '/public/uploads/';
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir); // if directory doesn't exist, create it
        }
        var fileName = file.name;
        var validFileName = new RegExp("eventresult_[0-9]{8}.csv");
        var fileMatches = validFileName.exec(fileName);
        if (fileMatches != null) {
            file.path = uploadsDir + fileName;
        }
        else {
            console.log('file is not valid'); // TODO: make this do something
        }
    });
    form.on('file', function (name, file) {
        csv_to_db_1.csvToDb.csv_to_db(file);
    });
    res.send("blah"); // TODO: send something
});
// </editor-fold desc="Front end pages>
// <editor-fold desc="api pages">
app.get("/api/results", function (req, res) {
    var query = "SELECT * FROM results";
    sql_1.SQL.selectFromDatabase(req, res, query);
});
app.get("/api/session/:sessionId", function (req, res) {
    var query = "SELECT * FROM results where sessionId = " + mysql.escape(req.params.sessionId) + ";";
    sql_1.SQL.selectFromDatabase(req, res, query);
});
app.get("/api/currency", function (req, res) {
    var query = "SELECT drivers.driverName, currency.* FROM currency LEFT JOIN drivers ON drivers.driverId = currency.driverId ORDER BY driverId desc;";
    sql_1.SQL.selectFromDatabase(req, res, query);
});
app.get("/api/currency/:driverId", function (req, res) {
    var query = "SELECT drivers.driverName, currency.* FROM currency LEFT JOIN drivers ON drivers.driverId = currency.driverId where currency.driverId="
        + mysql.escape(req.params.driverId) + ";";
    sql_1.SQL.selectFromDatabase(req, res, query);
});
app.get("/api/drivers", function (req, res) {
    var query = "SELECT * FROM drivers;";
    sql_1.SQL.selectFromDatabase(req, res, query);
});
app.get("/api/driver/:driverId", function (req, res) {
    var query = "SELECT * FROM drivers where driverId = " + mysql.escape(req.params.driverId) + ";";
    sql_1.SQL.selectFromDatabase(req, res, query);
});
app.get("/api/sessionDetails/:sessionId", function (req, res) {
    var query = "SELECT * FROM session_details WHERE sessionId = " + mysql.escape(req.params.sessionId) + ";";
    sql_1.SQL.selectFromDatabase(req, res, query);
});
// </editor-fold desc="api pages">
app.get("*", function (req, res) {
    res.send("404");
});
console.log("Server running on port " + PORT);
app.listen(PORT);
//# sourceMappingURL=server.js.map