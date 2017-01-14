var mysql = require('mysql');

var secrets = require("../../secrets.json");

var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'jordanmalish.com',
    user: 'usrc_results',
    password: secrets.sql,
    database: 'usrc_results',
    debug: false
});

function select_from_database(req, res, query) {
    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }

        connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
        });

        connection.query(query, function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }
        });
    });
}

function insert_to_database(query) {
    pool.getConnection(function(err,connection){
        if (err) {
            console.error(err);
            return;
        }

        connection.on('error', function(err) {
            console.error(err);
        });

        connection.query(query, function(err,rows){
            connection.release();
            if(err) console.error(err);
        });
    });
}

module.exports = {
    selectFromDatabase: select_from_database,
    insertIntoDatabase: insert_to_database
};