import * as fs from 'fs';
import * as express from "express";
import * as bodyParser from 'body-parser';
import * as formidable from 'formidable';
import * as mysql from 'mysql';
import {SQL} from './js/sql';
import {csvToDb} from './js/csv-to-db';
import myCsvToDb = csvToDb.csv_to_db;
import {currencyCalc} from './js/currency';

let secrets = require('./../secrets.json');

let app = express();
let PORT:number = secrets.port;

app.use('/node_modules', express.static(__dirname + '/node_modules'))
    .use(express.static(__dirname + '/public/'))
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json(null));

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// app.post("/api/upload", function (req: any, res: any) {
//     console.log(req.body);
//     res.json({'message': 'This is a response message!'});
// });

// <editor-fold desc="api pages">
app.get("/api/sessions", function(req:any ,res:any){
    let query:string = "SELECT * FROM usrc_results.session_details ORDER BY startTime ASC, sessionId ASC;";

    SQL.selectFromDatabase(req, res, query);
});

app.get("/api/session/latest", function(req:any ,res:any){
    let query:string =
        "SELECT session.finPos, session.carNum, session.name as driverName, session.startPos, session.interval, " +
        "session.inc, tf.tf totalFunds, ca.cA raceEarnings, tf.driverId from (select r.sessionId, r.finPos, " +
        "r.carNum, r.startPos, r.interval, r.inc, r.custId, r.name FROM usrc_results.results r where r.sessionId = " +
        "(SELECT max(sessionId) from session_details)) session inner join (SELECT c.driverId, " +
        "sum(c.currencyAdjustment) tf, c.sessionId FROM usrc_results.currency c join drivers d on d.driverId = " +
        "c.driverId group by driverId) tf inner join (select c.driverId, sum(c.currencyAdjustment) ca, c.sessionId " +
        "FROM usrc_results.currency c where c.sessionId = (SELECT max(sessionId) from session_details) group by " +
        "c.driverId) ca on tf.driverId = session.custId and ca.driverId = session.custId and " +
        "ca.sessionId = session.sessionId order by finPos;";

    SQL.selectFromDatabase(req, res, query);
});

app.get("/api/session/:sessionId", function(req:any ,res:any){
    let query:string = "SELECT * FROM usrc_results.session_details where sessionId = " + mysql.escape(req.params.sessionId) + ";";

    SQL.selectFromDatabase(req, res, query);
});

app.get("/api/result/:sessionId", function(req:any, res:any){
    let query:string = " SELECT session.finPos, session.carNum, session.name as driverName, session.startPos, " +
        "session.interval, session.inc, tf.tf totalFunds, ca.cA raceEarnings, tf.driverId FROM (SELECT r.sessionId, " +
        "r.finPos, r.carNum, r.startPos, r.interval, r.inc, r.custId, r.name FROM usrc_results.results r where " +
        "r.sessionId = " + mysql.escape(req.params.sessionId) + ") session inner join (SELECT c.driverId, " +
        "sum(c.currencyAdjustment) tf, c.sessionId FROM usrc_results.currency c join drivers d on d.driverId " +
        "= c.driverId group by driverId) tf inner join (SELECT c.driverId, sum(c.currencyAdjustment) ca, " +
        "c.sessionId FROM usrc_results.currency c where c.sessionId = (" + mysql.escape(req.params.sessionId) +
        ") group by c.driverId) ca on tf.driverId = session.custId and ca.driverId = session.custId and " +
        "ca.sessionId = session.sessionId order by finPos;";

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
        "SELECT currency.*, sd.startTime, sd.Track track, drivers.driverName FROM currency left join session_details sd " +
        "on currency.sessionId = sd.sessionId left join drivers on drivers.driverId=currency.driverId" +
        " where currency.driverId=" + mysql.escape(req.params.driverId) + " order by sessionId desc, id desc;";

    SQL.selectFromDatabase(req, res, query);
});

app.get("/api/currencyEarned/:driverId/:sessionId", function (req: any, res: any) {
    let query:string =
        "SELECT SUM(currencyAdjustment) as earned FROM usrc_results.currency WHERE driverId = "
        + mysql.escape(req.params.driverId) + "AND sessionId = " + mysql.escape(req.params.sessionId) + ";";

    SQL.selectFromDatabase(req, res, query);
});

app.get("/api/drivers", function (req: any, res: any) {
    let query:string = "SELECT * FROM drivers ORDER BY driverName;";

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

app.get("/api/currentStandings", function (req: any, res: any) {
    let query:string = "SELECT SUM(currency.currencyAdjustment) as 'driverTotal', drivers.driverName, currency.driverId " +
        "FROM currency " +
        "LEFT JOIN drivers ON drivers.driverId = currency.driverId " +
        "GROUP BY driverId " +
        "ORDER BY driverTotal desc, driverName desc;";

    SQL.selectFromDatabase(req, res, query);
});

app.get("/api/insert/bonus/:driverId/:reason/:currencyAdj", function (req: any, res: any) {
    let newReason = (req.params.reason).replace(/_/g, ' ');

    let query:string = "INSERT INTO `usrc_results`.`currency`" +
        "(`sessionId`, `driverId`, `reason`, `currencyAdjustment`) VALUES " +
        "('1', " +  // just going to use session ID of 1 to denote manually added bonus points
        mysql.escape(req.params.driverId) + ", " +
        mysql.escape(newReason) + ", " +
        mysql.escape(req.params.currencyAdj) + ");";


    SQL.insertIntoDatabase(query);
});

app.get("/api/insert/newDriver/:driverId/:driverName", function (req: any, res: any) {
    let newName = (req.params.driverName).replace(/_/g, ' ');

    currencyCalc.addNewDriver(newName, req.params.driverId);
});

app.get("/api/*", function (req: any, res: any) {
    res.json({"code": 404, "status": "No endpoint"});
});
// </editor-fold desc="api pages">

// <editor-fold desc="Front end pages>
// app.get('/', function(req:any, res:any) {
//     // res.sendFile('index.html', { root: __dirname + "/public/" });
//
//     // This app.get literally does nothing, and I don't know why
//     // I've fixed it by redirecting in angular, but still...
// });

app.get('/upload', function (req: any, res:any) {
    res.sendFile('upload.html', { root: __dirname + "/public/" });
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
        }
    });

    form.on('file', function (name:string, file:any){
        let fileName:string = file.name;
        let validFileName:any = new RegExp("eventresult_[0-9]{8}.csv");
        let fileMatches:any = validFileName.exec(fileName);

        if (fileMatches != null) {
            csvToDb.csv_to_db(file, res)
                .then(function (csv_to_db) {

                    if (csv_to_db) {
                        res.redirect('/currency');
                    } else {
                        res.send("File name changed or incorrect session type.");
                    }
                });
        } else {
            console.log('File does not have a valid file name.');
        }
    });
});

app.get('*', function(req:any, res:any) {
    let requestedPath = req.path;

    if (requestedPath[requestedPath.length-1] === '/') {
        requestedPath = requestedPath.substring(0, requestedPath.length-1);

        res.redirect(requestedPath);
    } else {
        res.sendFile('index.html', { root: __dirname + "/public/" });
    }
});
// </editor-fold desc="Front end pages>

console.log("Server running on port " + PORT);
app.listen(PORT);