import * as fs from 'fs';
import * as express from "express";
import * as bodyParser from 'body-parser';
import * as formidable from 'formidable';
import * as mysql from 'mysql';
import {SQL} from './public/js/sql';
import {csvToDb} from './public/js/csv-to-db';
import myCsvToDb = csvToDb.csv_to_db;

let app:any = express();
let PORT:number = 3000;

app.use('/node_modules', express.static(__dirname + '/node_modules'))
    .use(express.static(__dirname + '/public/'))
    .use(bodyParser.json(null));

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// <editor-fold desc="api pages">
app.get("/api/sessionDetails", function(req:any ,res:any){
    let query:string = "SELECT * FROM usrc_results.session_details ORDER BY startTime ASC, sessionId ASC;";

    SQL.selectFromDatabase(req, res, query);
});

app.get("/api/result/:sessionId", function(req:any, res:any){
    let query:string = "SELECT * FROM results where sessionId = " + mysql.escape(req.params.sessionId) + "ORDER BY finPos ASC;";

    SQL.selectFromDatabase(req, res, query);
});

app.get("/api/results", function(req:any, res:any){
    let query:string = "SELECT * FROM results;";

    SQL.selectFromDatabase(req, res, query);
});

app.get("/api/currency", function(req:any, res:any){
    let query:string =
        "SELECT drivers.driverName, currency.* " +
        "FROM currency " +
        "LEFT JOIN drivers " +
        "ON drivers.driverId = currency.driverId " +
        "ORDER BY currency.id desc;";

    SQL.selectFromDatabase(req, res, query);
});

app.get("/api/currency/:driverId", function (req: any, res: any) {
    let query:string =
        "SELECT drivers.driverName, currency.* " +
        "FROM currency " +
        "LEFT JOIN drivers " +
        "ON drivers.driverId = currency.driverId " +
        "where currency.driverId=" + mysql.escape(req.params.driverId) + ";";

    SQL.selectFromDatabase(req, res, query);
});

app.get("/api/drivers", function (req: any, res: any) {
    let query:string = "SELECT * FROM drivers;";

    SQL.selectFromDatabase(req, res, query);
});

app.get("/api/driver/:driverId", function(req:any, res:any){
    let query:string = "SELECT * FROM drivers where driverId = " + mysql.escape(req.params.driverId) + ";";

    SQL.selectFromDatabase(req, res, query);
});

app.get("/api/sessionDetail/:sessionId", function (req: any, res: any) {
    let query:string = "SELECT * FROM session_details WHERE sessionId = " + mysql.escape(req.params.sessionId) + ";";

    SQL.selectFromDatabase(req, res, query);
});

app.get("/api/*", function (req: any, res: any) {
    res.json({"code": 404, "status": "No endpoint"});
});
// </editor-fold desc="api pages">

// </editor-fold desc="Front end pages>
// app.get('/', function(req:any, res:any) {
//     // res.sendFile('index.html', { root: __dirname + "/public/" });
//
//     // This app.get literally does nothing, and I don't know why
//     // I've fixed it by redirecting in angular, but still...
// });

app.post('/upload', function (req:any, res:any){
    let form:any = new formidable.IncomingForm();
    form.parse(req);

    form.on('fileBegin', function (name:string, file:any){
        let uploadsDir:string = __dirname + '/public/uploads/';

        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir); // if directory doesn't exist, create it
        }

        let fileName:string = file.name;
        let validFileName:any = new RegExp("eventresult_[0-9]{8}.csv");
        let fileMatches:any = validFileName.exec(fileName);

        if (fileMatches != null) {
            file.path = uploadsDir + fileName;
        }
    });

    form.on('file', function (name:string, file:any){
        let csvToDb_Response:any;

        let fileName:string = file.name;
        let validFileName:any = new RegExp("eventresult_[0-9]{8}.csv");
        let fileMatches:any = validFileName.exec(fileName);

        if (fileMatches != null) {
            csvToDb.csv_to_db(file)
                .then(function (csv_to_db) {
                    csvToDb_Response = csv_to_db; // this will either be a session ID or a message telling us the session has already been uploaded

                    if (csv_to_db) {
                        res.redirect('/currency');
                    } else {
                        // file already exists
                    }
                });
        } else {
            console.log('File does not have a valid file name.'); // TODO: make this do something
        }
    });
});

app.get('*', function(req:any, res:any) {
    // console.log("Orig url - " + req.originalUrl); // '/admin/new'
    // console.log("Base Url - " + req.baseUrl); // '/admin'
    // console.log("req.path - " + req.path); // '/new'
    res.sendFile('index.html', { root: __dirname + "/public/" });
});
// </editor-fold desc="Front end pages>

console.log("Server running on port " + PORT);
app.listen(PORT);