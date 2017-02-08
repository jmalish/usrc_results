import * as mysql from 'mysql';

let secrets:any = require("../../secrets.json");

let pool:any = mysql.createPool({
    connectionLimit: 100,
    host: 'jordanmalish.com',
    user: 'usrc_results',
    password: secrets.sql,
    database: 'usrc_results',
    debug: false
});

export module sql {
    export function selectFromDatabase(req: any, res: any, query: string) {
        pool.getConnection(function (err: any, connection: any) {
            if (err) {
                res.json({"code": 100, "status": "Error in connection database"});
                return;
            }

            connection.on('error', function (err: any) {
                res.json({"code": 100, "status": "Error in connection database"});
            });

            connection.query(query, function (err: any, rows: any) {
                connection.release();
                if (!err) {
                    res.json(rows);
                }
            });
        });
    }

    export function insertIntoDatabase(query: string) {
        pool.getConnection(function (err: any, connection: any) {
            if (err) {
                console.error(err);
                return;
            }

            connection.on('error', function (err: any) {
                console.error(err);
            });

            connection.query(query, function (err: any) {
                connection.release();
                if (err) console.error(err);
            });
        });
    }
}