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
    .use('/app', express.static(__dirname + '/app'))
    .use('/html', express.static(__dirname + '/app/html'))
    .use('/css', express.static(__dirname + '/app/css'))
    .use(express.static(__dirname + '/public/'))
    .use(bodyParser.json(null));

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// <editor-fold desc="api pages">
app.get("/api/results", function(req:any ,res:any){
    let query:string = "SELECT * FROM results";

    SQL.selectFromDatabase(req, res, query);
});

app.get("/api/session/:sessionId", function(req:any, res:any){
    let query:string = "SELECT * FROM results where sessionId = " + mysql.escape(req.params.sessionId) + ";";

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

app.get("/api/sessionDetails/:sessionId", function (req: any, res: any) {
    let query:string = "SELECT * FROM session_details WHERE sessionId = " + mysql.escape(req.params.sessionId) + ";";

    SQL.selectFromDatabase(req, res, query);
});
// </editor-fold desc="api pages">

// </editor-fold desc="Front end pages>
app.get('/', function(req:any, res:any) {
    res.sendFile('index.html', { root: __dirname + "/public/" });
});

app.get('/upload', function (req:any, res:any) {
    res.sendFile('uploadNewRace.html', { root: __dirname + "/public/" });
});

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
        } else {
            console.log('file is not valid'); // TODO: make this do something
        }
    });

    form.on('file', function (name:string, file:any){
        csvToDb.csv_to_db(file)
            .then(function (csv_to_db) {
                if (csv_to_db.length === 8) {
                    res.redirect('/currency');
                } else {
                    res.send("File already uploaded");
                }
            });
    });
});

app.get('*', function(req:any, res:any) {
    res.sendFile('index.html', { root: __dirname + "/public/" });
});
// </editor-fold desc="Front end pages>


console.log("Server running on port " + PORT);
app.listen(PORT);