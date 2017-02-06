var fs = require('fs');
var sql = require('./sql');
var http = require('http');
var Promise = require('bluebird');
var currency = require('./currency');

module.exports = function csv_to_db(csvFile) {
    fs.readFile(csvFile.path, 'utf8', function (err, data) {
        if (err) return console.log(err);

        var sessionID = csvFile.path.split('eventresult_')[1].split('.')[0];

        checkSessionId(sessionID)
            .then(function (checkSessionId) {
                if (checkSessionId) {
                    uploadToDb(data, sessionID)
                        .then(function (uploadToDb) {
                            currency(uploadToDb, sessionID);
                        })
                } else {
                    console.error("These results have already been uploaded!");
                }
            });
    }); // end of fs.readFile()
};

function checkSessionId(sessionId) {  // checks to see if this session exists already
    return new Promise(function (resolve) {
        var options = {  // TODO: make this not localhost and use the correct port
            host: 'localhost',
            port: 3000,
            path: "/api/sessions/" + sessionId,
            method: 'GET'
        };

        http.request(options, function (res) {
            var data = '';  // create blank string to hold body
            res.on('data', function (body) {data += body}); // put body into string we created
            res.on('end', function () {
                var apiResponse = JSON.parse(data);
                if (apiResponse[0] != undefined) {
                    // console.error("These results have already been uploaded!");
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        }).end();
    });
}

function uploadToDb(_data, _sessionId) {  // parses results and pushes them to the database
    return new Promise(function (resolve) {
        try {
            var sessionInfo = _data.split("\r\n\n")[0].split("\n")[1];
            var leagueInfo = _data.split("\r\n\n\n\n")[1].split("\n\n")[0].split("\n")[1];
            var results = _data.split("\r\n\n\n\n")[1].split("\n\n")[1];
        } catch (err) {} // error handled in next block

        if ((_sessionId.length != 8) || results == undefined) { // file was either renamed, or is not going to fit our needed format
            console.error("File name changed or incorrect session type.");
            resolve(false);
        }

        // <editor-fold desc="splits">
        var startTime = sessionInfo.split(",")[0];
        startTime = startTime.substring(1, startTime.length - 1);  // get rid of leading and trailing "
        var track = sessionInfo.split("\",\"")[1];
        var leagueName = leagueInfo.split(",")[0];
        leagueName = leagueName.substring(1, leagueName.length - 1); // get rid of leading and trailing "
        var leagueId = leagueInfo.split("\",\"")[1];
        var leagueSeason = leagueInfo.split("\",\"")[2];
        var leagueSeasonId = leagueInfo.split("\",\"")[3];
        // </editor-fold desc="splits">

        // <editor-fold desc="query">
        var query = "INSERT INTO session_details (`sessionId`, `startTime`, `Track`, `leagueName`, `leagueId`, `leagueSeason`, `leagueSeasonId`) VALUES (" +
            "\"" + _sessionId + "\", \"" +
            startTime + "\", \"" +
            track + "\", \"" +
            leagueName + "\", \"" +
            leagueId + "\", \"" +
            leagueSeason + "\", \"" +
            leagueSeasonId + "\");";
        // </editor-fold desc="query">

        sql.insertIntoDatabase(query);

        var resultsArray = results.split("\n"); // split results into individual lines
        var params = resultsArray[0].substring(1);

        params = params.split('","'); // get the headers into it's own variable
        params[params.length - 1] = params[params.length - 1].substring(0, params[params.length - 1].length - 2); // cleaning up trash on end of str

        for (var i = 0; i < params.length; i++) { // get rid of annoying characters
            params[i] = params[i].split("(").join("");
            params[i] = params[i].split(")").join("");
            params[i] = params[i].split("%").join("");
            params[i] = params[i].split("#").join("_Num");
            params[i] = params[i].split(" ").join("_");
            params[i] = params[i].split("__").join("_");
        }

        resultsArray.shift(); // get rid of the line that contains all the headers by dropping the first array element

        var objects = []; // this will contain the positions

        resultsArray.forEach(function (result) {
            var object = {};

            result = result.substring(1).split('","');
            result[result.length - 1] = result[result.length - 1].substring(0, result[result.length - 1].length - 2); // cleaning up trash on end of str

            for (var i = 0; i < params.length; i++) {
                object[params[i]] = result[i];
            }

            if (object.Car != undefined) { // make sure we don't get any blank lines
                objects.push(object);

                // <editor-fold desc="dat query">
                query = "INSERT INTO `usrc_results`.`results` " +
                    "(`sessionId`, `finPos`, `carId`, `car`, `carClassId`, `carClass`, `teamId`, `custId`, `name`, `startPos`, `carNum`, " +
                    "`outId`, `out`, `interval`, `lapsLed`, `qualifyTime`, `averageLapTime`, `fastestLapTime`, `fastLapNum`, " +
                    "`lapsComp`, `inc`, `leaguePoints`, `maxFuelFillPerc`, `weightPenaltyKg`) VALUES (" +
                    "'" + _sessionId + "', '" +
                    object.Fin_Pos + "', '" +
                    object.Car_ID + "', '" +
                    object.Car + "', '" +
                    object.Car_Class_ID + "', '" +
                    object.Car_Class + "', '" +
                    object.Team_ID + "', '" +
                    object.Cust_ID + "', '" +
                    object.Name + "', '" +
                    object.Start_Pos + "', '" +
                    object.Car_Num + "', '" +
                    object.Out_ID + "', '" +
                    object.Out + "', '" +
                    object.Interval + "', '" +
                    object.Laps_Led + "', '" +
                    object.Qualify_Time + "', '" +
                    object.Average_Lap_Time + "', '" +
                    object.Fastest_Lap_Time + "', '" +
                    object.Fast_Lap_Num + "', '" +
                    object.Laps_Comp + "', '" +
                    object.Inc + "', '" +
                    object.League_Points + "', '" +
                    object.Max_Fuel_Fill + "', '" +
                    object.Weight_Penalty_KG + "');";
                // </editor-fold>

                sql.insertIntoDatabase(query);
            }
        });

        resolve(objects);
    });
}