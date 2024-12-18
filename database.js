const mysql = require("mysql");

//####################### CREATING A CONNECTION TO A MYSQL DB ################################

var connection = mysql.createConnection({
    host: "127.0.0.1", // The hostname or IP address of the database server
    database: "mysql_db", // (Schema name) The password for the specified user
    user: "root", //The username to authenticate with the MySQL database
    password: "password" //The password for the specified user
});

//####################### ESTABLISH A CONNECTION TO A MYSQL DB ################################

//Connect to the database using the credentials
connection.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
        return;
    }
    console.log("Status: Connected to the database");

    //Create the table if it doesn't exist
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS mysql_table (
            id INT AUTO_INCREMENT PRIMARY KEY,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            phone VARCHAR(15) NOT NULL,
            age INT(2) NOT NULL,
            eircode VARCHAR(10)
        );
    `;

    connection.query(createTableQuery, (err, result) => { 
        // Creating a table, and handle the response of errors from the database
        if (err) {
            console.error("Error creating the table:", err.message);
        } else {
            console.log("MySQL: Table created or already exists.");
        }
    });
});

// We can export the connection object, so can be reused in other files. Share the db connection
module.exports = connection;