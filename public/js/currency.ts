var http = require('http');
var sql = require('./sql');
var Promise = require('bluebird');

module.exports = function calculateCurrency(_drivers, _sessionId) {
    newDriverCheck(_drivers, _sessionId)
        .then(function () {
            Promise.each(_drivers, function (driver) {
                finishPosCalculation(driver, _sessionId);
                poleSitterBonus(driver, _sessionId);
                incidentCalculations(driver, _sessionId);
            });
        });
};


function newDriverCheck(_drivers, _sessionId) {
    return new Promise(function (resolve) {
        var i = 0;
        Promise.each(_drivers, function (driver) {
            var options = {  // TODO: make this not localhost and use the correct port
                host: 'localhost',
                port: 3000,
                path: "/api/drivers/" + driver.Cust_ID,
                method: 'GET'
            };

            http.request(options, function (res) {
                var data = '';  // create blank string to hold body
                res.on('data', function (body) {
                    data += body
                }); // put body into string we created
                res.on('end', function () {
                    var apiResponse = JSON.parse(data);
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

function incidentCalculations(_driver, _sessionId) {
    return new Promise(function (resolve) {
        var incCount = _driver.Inc;
        var incPenaltyAmt = 0;
        var penaltyReason = incCount + " incidents";

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

function finishPosCalculation(_driver, _sessionId) {
    return new Promise(function (resolve) {
        var finishPos = _driver.Fin_Pos;
        var winnings = 44 - finishPos;
        var finishReason = 'Finished ' + finishPos;

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

function poleSitterBonus(_driver, _sessionId) {
    return new Promise(function (resolve) {
        if (_driver.Start_Pos === "1") {
            resolve(insertToDatabase(_sessionId, _driver.Cust_ID, "Pole sitter", 5));
        }
    });
}

function insertToDatabase(_sessionId, _driverId, _reason, _adjustmentAmt) {
    var query = "INSERT INTO `usrc_results`.`currency` " +
        "(`driverId`, `sessionId`, `reason`, `currencyAdjustment`) VALUES (" +
        "'" + _driverId + "', " +
        "'" + _sessionId + "', " +
        "'" + _reason + "', " + // TODO: reason
        "'" + _adjustmentAmt + "'" + // TODO: currencyAdjustment (int)
        ");";

    sql.insertIntoDatabase(query);
}