var fs = require('fs');
var sql = require('./sql');

function csv_to_db(csvFile) {
    fs.readFile(csvFile, 'utf8', function (err, data) {
        if (err) return console.log(err);

        var sessionID = csvFile.split('_')[1].split('.')[0];

        var sessionInfo = data.split("\r\n\n")[0].split("\n")[1];
        var leagueInfo = data.split("\r\n\n\n\n")[1].split("\n\n")[0].split("\n")[1];
        var results = data.split("\r\n\n\n\n")[1].split("\n\n")[1];

        if ((sessionID.length != 8) || results == undefined) { // file was either renamed, or is not going to fit our needed format
            console.error("File name changed or incorrect session type.");
            // return;
        }

        var startTime = sessionInfo.split(",")[0];
        startTime = startTime.substring(1, startTime.length - 1);  // get rid of leading and trailing "
        var track = sessionInfo.split("\",\"")[1];
        var leagueName = leagueInfo.split(",")[0];
        leagueName = leagueName.substring(1, leagueName.length - 1); // get rid of leading and trailing "
        var leagueId = leagueInfo.split("\",\"")[1];
        var leagueSeason = leagueInfo.split("\",\"")[2];
        var leagueSeasonId = leagueInfo.split("\",\"")[3];

        var query = "INSERT INTO session_details (`sessionId`, `startTime`, `Track`, `leagueName`, `leagueId`, `leagueSeason`, `leagueSeasonId`) VALUES (" +
            "\"" + sessionID + "\", \"" +
            startTime + "\", \"" +
            track + "\", \"" +
            leagueName + "\", \"" +
            leagueId + "\", \"" +
            leagueSeason + "\", \"" +
            leagueSeasonId + "\");";

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
                    "'" + sessionID + "', '" +
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
    })
}

module.exports = {
    csvToDatabase: csv_to_db(csvFile)
};