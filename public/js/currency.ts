import * as http from 'http';
import * as Promise from 'bluebird';
import * as mysql from 'mysql';
import {SQL} from './sql';

export module currencyCalc {
    export function calculateCurrency(_drivers: any, _sessionId: number) {
        return new Promise(function (resolve) {
            newDriverCheck(_drivers, _sessionId)
                .then(function () {
                    Promise.each(_drivers, function (driver: any) {
                        finishPosCalculation(driver, _sessionId);
                        poleSitterBonus(driver, _sessionId);
                        incidentCalculations(driver, _sessionId);
                    });
                }).then(function () {
                    resolve();
            });
        });
    }
}


function newDriverCheck(_drivers:any, _sessionId:number) {
    return new Promise(function (resolve:any) {
        let i:number = 0;
        Promise.each(_drivers, function (driver:any) {
            let options:any = {
                host: 'jordanmalish.com',
                path: "/api/driver/" + driver.Cust_ID,
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
                        addDriver(driver.Cust_ID, driver.Name);
                        addCurrencyAdjustment(0, driver.Cust_ID, "New driver signing bonus", 500);
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

        resolve(addCurrencyAdjustment(_sessionId, _driver.Cust_ID, penaltyReason, incPenaltyAmt));
    });
}

function finishPosCalculation(_driver:any, _sessionId:number) {
    return new Promise(function (resolve:any) {
        let finishPos:number = _driver.Fin_Pos;
        let winnings:number = 44 - finishPos;
        let finishReason:string = 'Finished P' + finishPos;

        resolve(addCurrencyAdjustment(_sessionId, _driver.Cust_ID, finishReason, winnings));
    })
}

function poleSitterBonus(_driver:any, _sessionId:number) {
    return new Promise(function (resolve:any) {
        if (_driver.Start_Pos === "1") {
            resolve(addCurrencyAdjustment(_sessionId, _driver.Cust_ID, "Pole sitter", 5));
        }
    });
}

function addCurrencyAdjustment(_sessionId:number, _driverId:number, _reason:string, _adjustmentAmt:number) {
    let query:string = "INSERT INTO `usrc_results`.`currency` " +
        "(`driverId`, `sessionId`, `reason`, `currencyAdjustment`) VALUES (" +
        mysql.escape(_driverId) + ", " +
        mysql.escape(_sessionId) + ", " +
        mysql.escape(_reason) + ", " + // reason
        mysql.escape(_adjustmentAmt) + // currencyAdjustment (int)
        ");";

    SQL.insertIntoDatabase(query);
}

function addDriver(_driverId:string, _driverName:string) {
    let query:string = "INSERT INTO `usrc_results`.`drivers` (`driverId`, `driverName`) VALUES (" +
        mysql.escape(_driverId) + ", " +
        mysql.escape(_driverName) +
        ");";

    SQL.insertIntoDatabase(query);
}