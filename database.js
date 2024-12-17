var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "127.0.0.1", // or localhost
    database:"mysql_db", // Schema name
    user:"root",
    password:"password"

})

module.exports = connection;