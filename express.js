// THis is the framework
// We will be using this framework to create 
//  Some logic to handle the process 
//  Of sending and recieving information 
//  From the client to the server application

// Import the express framework 
var express = require("express");
const path = require("path");

// Create the instance of the object 
// This will allow us to access the methods
var app = express();


// Import the database 
// This will allow me to connect to the database using the info 

var connection = require("./database")

// Now we need to give access to the styling and other associated files
app.use(express.static(__dirname));

// Establish a method to serve the commincation between these files
app.use(express.urlencoded({extended:true}));

//```````````````````````
// Middleware to check if the specified port is open
app.use((req, res, next) => {
    const port = 3000;
    const net = require('net');
    const server = net.createServer();

    server.once('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            return res.status(503).send(`Error: Port ${port} is already in use.`);
        }
        next(err); // Pass any unexpected errors to the error-handling middleware
    });

    server.once('listening', () => {
        server.close();
        next(); // Proceed to the next middleware
    });

    server.listen(port);
});

// Middleware to ensure the database schema is correct
app.use((req, res, next) => {
    const sql = "DESCRIBE mysql_table"; // Check the table schema
    connection.query(sql, (err, results) => {
        if (err) {
            console.error("Database schema verification failed:", err);
            return res.status(500).send("Error: Database schema is not correctly configured.");
        }
        console.log("Database schema validated successfully.");
        next(); // Proceed to the next middleware
    });
});
//``````````````````````

// Now that the port is established we can create a response to the client 
// This get method will recieve or get the response and send it to the client 

// Now we know we can get the database information
// THis means our database is fully connected and the server reads the information
// THe next step is to connect the server to the form page 
app.get('/', function(req, res){

        // Serve the form from the client 
        // In response we pass in the location of the form
        // This way the server app gets the form from the local storage
        // and sends it to the client through a response
        // THe first argument is the location/ url of the file
//      __dirname == C:/users/user/Desktop/..
        res.sendFile(__dirname + '/form/form.html');

    // Get the database info 
    // Creat a variable that will contain the query
    // let sql = "SELECT * FROM mysql_table"; // this will be ran in mysql workbench
    
    // // Pass in the connection and send the information to rescieve the respons
    // connection.query(sql, function(err, results){
    //     // Catch errors and throw them 
    //     if(err) throw err; // If error throw error 
        
    //     res.send(results); // Otherwise send the results 
    // })


    // res.send("Port is working ok!");

})


// Create a POST method to send the information to the database
// WHen should this method be executed?

app.post('/submit', function(req, res) {
    // Destructure the data coming from the form
    const { firstname, lastname, email, phone, eircode } = req.body;
  
    // Validate first name (alphanumeric, max length 20)
    if (!/^[a-zA-Z0-9]{1,20}$/.test(firstname)) {
      return res.send("First name must be alphanumeric and no longer than 20 characters.");
    }
  
    // Validate last name (alphanumeric, max length 20)
    if (!/^[a-zA-Z0-9]{1,20}$/.test(lastname)) {
      return res.send("Last name must be alphanumeric and no longer than 20 characters.");
    }
  
    // Validate email (must contain @ symbol and proper format)
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return res.send("Email must contain the @ symbol and be in a valid format.");
    }
  
    // Validate phone number (exactly 10 digits)
    if (!/^\d{10}$/.test(phone)) {
      return res.send("Phone number must contain exactly 10 digits and only numbers.");
    }
  
    // Validate eircode (must start with a number, alphanumeric, length 6)
    if (!/^[0-9][a-zA-Z0-9]{5}$/.test(eircode)) {
      return res.send("Eircode must start with a number, be alphanumeric, and have a length of 6 characters.");
    }
  
    // If all fields are valid, proceed to insert the data into the database
    const sql = "INSERT INTO mysql_tabledb (first_name, last_name, email, phone, eircode) VALUES (?,?,?,?,?)";
    connection.query(sql, [firstname, lastname, email, phone, eircode], function(err, results) {
      if (err) {
        console.error("Error Inserting into database: ", err);
        return res.send("Error: Could not insert information into the database!");
      }
      // If insertion is successful, redirect to home page
      res.redirect("/form/home.html");
    });
  });
  


// Create a port to establish a pathway for communication 
// This port will handle the traffic to and from the server application and client 
// TO open a port we will access the app variable
app.listen("3000", function(){

    //connect to a database and give th status
    connection.connect(function(err){
        // Catch error if error
        if(err) throw err;

        console.log("Database Connected");
    })


    // Send a message and check if the message is recieved by the client 
    console.log("App connected to port 3000"); // terminal response

})








