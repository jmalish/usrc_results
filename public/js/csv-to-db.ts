import * as fs from 'fs';
import * as http  from 'http';
import * as Promise from  'bluebird';
import {SQL} from './sql';
import {currencyCalc} from './currency';
import calculateCurrency = currencyCalc.calculateCurrency;

export module csvToDb {
    export function csv_to_db(csvFile: any) {
        return new Promise(function (resolve) {
            fs.readFile(csvFile.path, 'utf8', function (err:any, data:any) {
                if (err) return console.error(err.stack);

                let sessionID: number = csvFile.path.split('eventresult_')[1].split('.')[0];

                checkSessionId(sessionID)
                    .then(function (checkSessionId: any) {
                        if (checkSessionId) {
                            uploadToDb(data, sessionID)
                                .then(function (uploadToDb: any) {
                                    calculateCurrency(uploadToDb, sessionID)
                                        .then(function () {
                                            resolve(sessionID);
                                        });
                                })
                        } else {
                            resolve("These drivers have already been uploaded!");
                        }
                    });
            }); // end of fs.readFile()
        })
    }
}

function checkSessionId(sessionId:number) {  // checks to see if this session exists already
    return new Promise(function (resolve) {
        let options:any = {  // TODO: make this not localhost and use the correct port
            host: 'localhost',
            port: 3000,
            path: "/api/drivers/" + sessionId,
            method: 'GET'
        };

        http.request(options, function (res:any) {
            let data:string = '';  // create blank string to hold body
            res.on('data', function (body:string) {data += body}); // put body into string we created
            res.on('end', function () {
                let apiResponse:any = JSON.parse(data);
                if (apiResponse[0] != undefined) {
                    resolve(false); // These drivers have already been uploaded
                } else {
                    resolve(true);
                }
            });
        }).end();
    });
}

function uploadToDb(_data:any, _sessionId:number) {  // parses drivers and pushes them to the database
    return new Promise(function (resolve) {
        let sessionInfo:string, leagueInfo:string, results:string;

        try {
            sessionInfo = _data.split("\r\n\r\n")[0].split("\n")[1];
            leagueInfo = _data.split("\r\n\r\n\r\n\r\n")[1].split("\r\n\r\n")[0].split("\r\n")[1];
            results = _data.split("\r\n\r\n\r\n\r\n")[1].split("\r\n\r\n")[1];
        } catch (err) {} // error handled in next block

        let sessionIdStr:string = _sessionId.toString();
        if ((sessionIdStr.length != 8) || results == undefined) { // file was either renamed, or is not going to fit our needed format
            console.error("File name changed or incorrect session type.");
            resolve(false);
        } else {
            // <editor-fold desc="splits">
            let startTime:string = sessionInfo.split(",")[0];
            startTime = startTime.substring(1, startTime.length - 1);  // get rid of leading and trailing "
            let track:string = sessionInfo.split("\",\"")[1];
            let leagueName:string = leagueInfo.split(",")[0];
            leagueName = leagueName.substring(1, leagueName.length - 1); // get rid of leading and trailing "
            let leagueId:string = leagueInfo.split("\",\"")[1];
            let leagueSeason:string = leagueInfo.split("\",\"")[2];
            let leagueSeasonId:string = leagueInfo.split("\",\"")[3];
            // </editor-fold desc="splits">

            // <editor-fold desc="session_deailts query">
            let query:string = "INSERT INTO session_details (`sessionId`, `startTime`, `Track`, `leagueName`, `leagueId`, `leagueSeason`, `leagueSeasonId`) VALUES (" +
                "\"" + _sessionId + "\", \"" +
                startTime + "\", \"" +
                track + "\", \"" +
                leagueName + "\", \"" +
                leagueId + "\", \"" +
                leagueSeason + "\", \"" +
                leagueSeasonId + "\");";
            // </editor-fold desc="query">

            SQL.insertIntoDatabase(query);

            let resultsArray:any[] = results.split("\n"); // split drivers into individual lines
            let params:any = resultsArray[0].substring(1);

            params = params.split('","'); // get the headers into it's own variable
            params[params.length - 1] = params[params.length - 1].substring(0, params[params.length - 1].length - 2); // cleaning up trash on end of str

            for (let i:number = 0; i < params.length; i++) { // get rid of annoying characters
                params[i] = params[i].split("(").join("");
                params[i] = params[i].split(")").join("");
                params[i] = params[i].split("%").join("");
                params[i] = params[i].split("#").join("_Num");
                params[i] = params[i].split(" ").join("_");
                params[i] = params[i].split("__").join("_");
            }

            resultsArray.shift(); // get rid of the line that contains all the headers by dropping the first array element

            let objects:any[] = []; // this will contain the positions

            resultsArray.forEach(function (result) {
                let object:any = {};

                result = result.substring(1).split('","');
                result[result.length - 1] = result[result.length - 1].substring(0, result[result.length - 1].length - 2); // cleaning up trash on end of str

                for (let i:number = 0; i < params.length; i++) {
                    object[params[i]] = result[i];
                }

                if (object.Car != undefined) { // make sure we don't get any blank lines
                    objects.push(object);

                    // <editor-fold desc="drivers query">
                    query = "INSERT INTO `usrc_results`.`drivers` " +
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

                    SQL.insertIntoDatabase(query);
                }
            });

            resolve(objects);
        }
    });
}