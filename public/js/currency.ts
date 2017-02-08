import * as http from 'http';
import * as Promise from 'bluebird';
import {sql} from './sql';

export module currencyCalc {
   export function calculateCurrency(_drivers: any, _sessionId: number) {
        newDriverCheck(_drivers, _sessionId)
            .then(function () {
                Promise.each(_drivers, function (driver: any) {
                    finishPosCalculation(driver, _sessionId);
                    poleSitterBonus(driver, _sessionId);
                    incidentCalculations(driver, _sessionId);
                });
            });
    }
}


function newDriverCheck(_drivers:any, _sessionId:number) {
    return new Promise(function (resolve:any) {
        let i:number = 0;
        Promise.each(_drivers, function (driver:any) {
            let options:any = {  // TODO: make this not localhost and use the correct port
                host: 'localhost',
                port: 3000,
                path: "/api/drivers/" + driver.Cust_ID,
                method: 'GET'
            };

            http.request(options, function (res) {
                let data:string = '';  // create blank string to hold body
                res.on('data', function (body) {
                    data += body
                }); // put body into string we created
                res.on('end', function () {
                    let apiResponse:any = JSON.parse(data);
                    if (apiResponse[0] === undefined) {
                        insertToDatabase(_sessionId, driver.Cust_ID, "New driver signing bonus", 500);
                    }

                    i++;
                    if (i === _drivers.length) {
                        resolve();
                    }
                });
            }).end();
        });
    });
}

function incidentCalculations(_driver:any, _sessionId:number) {
    return new Promise(function (resolve:any) {
        let incCount:number = _driver.Inc;
        let incPenaltyAmt:number = 0;
        let penaltyReason:string = incCount + " incidents";

        switch (true) {
            case (incCount < 3):
                incPenaltyAmt = 50;
                break;
            case (incCount < 5):
                incPenaltyAmt = 0;
                break;
            case (incCount < 9):
                incPenaltyAmt = -25;
                break;
            case (incCount < 13):
                incPenaltyAmt = -50;
                break;
            default:
                incPenaltyAmt = -100;
                break;
        }

        resolve(insertToDatabase(_sessionId, _driver.Cust_ID, penaltyReason, incPenaltyAmt));
    });
}

function finishPosCalculation(_driver:any, _sessionId:number) {
    return new Promise(function (resolve:any) {
        let finishPos:number = _driver.Fin_Pos;
        let winnings:number = 44 - finishPos;
        let finishReason:string = 'Finished ' + finishPos;

        switch (finishPos % 10) {
            case 1:
                finishReason += 'st';
                break;
            case 2:
                finishReason += 'nd';
                break;
            case 3:
                finishReason += 'rd';
                break;
            default:
                finishReason += 'th';
                break;
        }

        resolve(insertToDatabase(_sessionId, _driver.Cust_ID, finishReason, winnings));
    })
}

function poleSitterBonus(_driver:any, _sessionId:number) {
    return new Promise(function (resolve:any) {
        if (_driver.Start_Pos === "1") {
            resolve(insertToDatabase(_sessionId, _driver.Cust_ID, "Pole sitter", 5));
        }
    });
}


function insertToDatabase(_sessionId:number, _driverId:number, _reason:string, _adjustmentAmt:number) {
    let query:string = "INSERT INTO `usrc_results`.`currency` " +
        "(`driverId`, `sessionId`, `reason`, `currencyAdjustment`) VALUES (" +
        "'" + _driverId + "', " +
        "'" + _sessionId + "', " +
        "'" + _reason + "', " + // TODO: reason
        "'" + _adjustmentAmt + "'" + // TODO: currencyAdjustment (int)
        ");";

    sql.insertIntoDatabase(query);
}