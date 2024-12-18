const mysql = require('mysql');
// creating a connection to mysql server
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'ooc2023', // have to change the user and password to ooc2023 because MySQL is being used for the OOC_DB assignment.
    // and in the assignment it is required that we use the following username and password
    password: 'ooc2023', // the same as username
    database: 'mysql_db'
});

// Simulated CSV Data
const csvData = `
"John, Doe",30,"johndoe@example.com", "0893216548", "1YR5DD"
"Jane, Smith",25,"janesmith@example.com", "0892856548", "8MH7WE"
"Michael, Johnson",null,"michaeljohnson@example.com", "0898523694", "7RP0RR"
"Tommy, Bean",45,"michaeljohnson@example.com", "0894859612", "EYR5DD"
`;

// Regex validation, as required in the assignment
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// email regex, required '@' symbol and '.' and few letters after the dot with no spaces
const phoneRegex = /^\d{10}$/;
// phone regex, has to be an int and 10 characters long.
const eircodeRegex = /^[A-Za-z0-9]{5,7}$/;
// eircode regex, has to be 5 to 7 characters long, and require letters and numbers
function checkData(data, index) {
    // making a function to check one line of data from the csvData variable
    const [name, age, email, phone, eircode] = data;
    // assigning fields to the data collected
    console.log(`Checking data at user index ${index}:`, data);
    // printing the current data we are checking, this was mainly used for troubleshooting

    // we will have to split the name to first and last as required
    const fullName = name.replace(/^"|"$/g, '').split(','); 
    // the replace regex removes "" marks and will split the name by the comma ','
    if (fullName.length < 2 || !fullName[0].trim() || !fullName[1].trim()) {
        // now trim the name by removing the aunnecessary spaces   

        throw new Error(`Error while checking data on user index  ${index}: Invalid name.`);
        // throw an error in case there are no first and last name possibly due to formatting errors
    }

    const firstName = fullName[0].trim();
    // save the first name
    const lastName = fullName[1].trim();
    // store the last name

    if (!age || isNaN(parseInt(age, 10))) {
        // checking if age is an int and throw an error if it isnt

        throw new Error(`Error while checking data on user index  ${index}: Invalid age.`);
    }

    if (!email || !emailRegex.test(email)) {
        // using the email regex assigned above, check the email field and throw an error if it does not match

        throw new Error(`Error while checking data on user index  ${index}: Invalid email.`);
    }

    if (!phone || !phoneRegex.test(phone)) {
        // using the phone regex and check the field, throw an error if it does not match

        throw new Error(`Error while checking data on user index  ${index}: Invalid phone number.`);
    }

    if (!eircode || !eircodeRegex.test(eircode)) {
        // check for the eircode regex and throw an error if it does not match
        throw new Error(`Error while checking data on user index  ${index}: Invalid Eircode.`);
    }

    return {
        // now return the checked and correct data that we can add to our DB below
        // the following return fields match our DB table columns
        first_name: firstName,
        last_name: lastName,
        age: parseInt(age, 10),
        email: email.trim(),
        phone: phone.trim(),
        eircode: eircode.trim()
    };
}


function checkCSVData(csvString) {
    // check csv data function to run through our provided csv data and return the values between ',' commas
    const rows = csvString.trim().split('\n').map(row => {
        const fields = [];
        // declaring the fields that will store data
        let match;
        // declaring each match when checked with the regex
        const regex = /"([^"]*)"|([^,]+)/g; 
        // this regex will check the data between ',' commas
        while ((match = regex.exec(row)) !== null) {
            // while loop to runthrough the whole data and split the data

            fields.push(match[1] || match[2]); 
            // storing each match in the fields array
        }
        return fields.map(field => field.trim());
        // trim away the spaces just in case
        // and return the result
    });

    const validDatas = [];
    // variable to store our validates data
    rows.forEach((data, index) => {
        // we have been having problems with the phone number and eircode failing regex
        // because they were still in "" quotes from the csv data
        // so the following will remove the quotes completely
        if (data[3]) data[3] = data[3].replace(/"/g, ''); 
        // Remove quotes from phone
        if (data[4]) data[4] = data[4].replace(/"/g, ''); 
        // Remove quotes from eircode

        try {
            const validatedData = checkData(data, index);
            // now calling our checkdata function to regex check all of the fields
            // and push the data we want to the valid data arra
            validDatas.push(validatedData);
        } catch (err) {
            // if there is an error
            // print it
            console.error(err.message);
        }
    });

    return validDatas;
    // return the check and correct data we want to push to our database
}


function insertDataIntoDb(datas) {
    // now this function will push our data into the database
    if (datas.length === 0) {
        console.log('No data to insert.');
        // if there is nothing returned in the valid datas array
        // there will be no data to insert
        return;
    }

    const sql = "INSERT INTO mysql_table (first_name, last_name, age, email, phone, eircode) VALUES ?";
    // here is our sql syntax to insert the data into our table
    const values = datas.map(data => [data.first_name, data.last_name, data.age, data.email, data.phone, data.eircode]);
    // declaring the values to insert into our sql query

    connection.query(sql, [values], function (err, results) {
        // using our sql connection run the sql query
        if (err) {
            // print the error if there was one
            console.error("Error inserting datas into database:", err);
        } else {
            // otherwise tell us how many users we added into the db
            console.log(`${results.affectedRows} numbers of user data inserted successfully.`);
        }
    });
}

// now that we have declared all the functions we need 
// the validdatas variable will check our csvdata using our function
const validDatas = checkCSVData(csvData);

// and insert the data into db function to try and insert the checked and correct data into the table.

insertDataIntoDb(validDatas);
const mysql = require('mysql');
// creating a connection to mysql server
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'ooc2023', // have to change the user and password to ooc2023 because MySQL is being used for the OOC_DB assignment.
    // and in the assignment it is required that we use the following username and password
    password: 'ooc2023', // the same as username
    database: 'mysql_db'
});

// Simulated CSV Data
const csvData = `
"John, Doe",30,"johndoe@example.com", "0893216548", "1YR5DD"
"Jane, Smith",25,"janesmith@example.com", "0892856548", "8MH7WE"
"Michael, Johnson",null,"michaeljohnson@example.com", "0898523694", "7RP0RR"
"Tommy, Bean",45,"michaeljohnson@example.com", "0894859612", "EYR5DD"
`;

// Regex validation, as required in the assignment
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// email regex, required '@' symbol and '.' and few letters after the dot with no spaces
const phoneRegex = /^\d{10}$/;
// phone regex, has to be an int and 10 characters long.
const eircodeRegex = /^[A-Za-z0-9]{5,7}$/;
// eircode regex, has to be 5 to 7 characters long, and require letters and numbers
function checkData(data, index) {
    // making a function to check one line of data from the csvData variable
    const [name, age, email, phone, eircode] = data;
    // assigning fields to the data collected
    console.log(`Checking data at user index ${index}:`, data);
    // printing the current data we are checking, this was mainly used for troubleshooting

    // we will have to split the name to first and last as required
    const fullName = name.replace(/^"|"$/g, '').split(','); 
    // the replace regex removes "" marks and will split the name by the comma ','
    if (fullName.length < 2 || !fullName[0].trim() || !fullName[1].trim()) {
        // now trim the name by removing the aunnecessary spaces   

        throw new Error(`Error while checking data on user index  ${index}: Invalid name.`);
        // throw an error in case there are no first and last name possibly due to formatting errors
    }

    const firstName = fullName[0].trim();
    // save the first name
    const lastName = fullName[1].trim();
    // store the last name

    if (!age || isNaN(parseInt(age, 10))) {
        // checking if age is an int and throw an error if it isnt

        throw new Error(`Error while checking data on user index  ${index}: Invalid age.`);
    }

    if (!email || !emailRegex.test(email)) {
        // using the email regex assigned above, check the email field and throw an error if it does not match

        throw new Error(`Error while checking data on user index  ${index}: Invalid email.`);
    }

    if (!phone || !phoneRegex.test(phone)) {
        // using the phone regex and check the field, throw an error if it does not match

        throw new Error(`Error while checking data on user index  ${index}: Invalid phone number.`);
    }

    if (!eircode || !eircodeRegex.test(eircode)) {
        // check for the eircode regex and throw an error if it does not match
        throw new Error(`Error while checking data on user index  ${index}: Invalid Eircode.`);
    }

    return {
        // now return the checked and correct data that we can add to our DB below
        // the following return fields match our DB table columns
        first_name: firstName,
        last_name: lastName,
        age: parseInt(age, 10),
        email: email.trim(),
        phone: phone.trim(),
        eircode: eircode.trim()
    };
}


function checkCSVData(csvString) {
    // check csv data function to run through our provided csv data and return the values between ',' commas
    const rows = csvString.trim().split('\n').map(row => {
        const fields = [];
        // declaring the fields that will store data
        let match;
        // declaring each match when checked with the regex
        const regex = /"([^"]*)"|([^,]+)/g; 
        // this regex will check the data between ',' commas
        while ((match = regex.exec(row)) !== null) {
            // while loop to runthrough the whole data and split the data

            fields.push(match[1] || match[2]); 
            // storing each match in the fields array
        }
        return fields.map(field => field.trim());
        // trim away the spaces just in case
        // and return the result
    });

    const validDatas = [];
    // variable to store our validates data
    rows.forEach((data, index) => {
        // we have been having problems with the phone number and eircode failing regex
        // because they were still in "" quotes from the csv data
        // so the following will remove the quotes completely
        if (data[3]) data[3] = data[3].replace(/"/g, ''); 
        // Remove quotes from phone
        if (data[4]) data[4] = data[4].replace(/"/g, ''); 
        // Remove quotes from eircode

        try {
            const validatedData = checkData(data, index);
            // now calling our checkdata function to regex check all of the fields
            // and push the data we want to the valid data arra
            validDatas.push(validatedData);
        } catch (err) {
            // if there is an error
            // print it
            console.error(err.message);
        }
    });

    return validDatas;
    // return the check and correct data we want to push to our database
}


function insertDataIntoDb(datas) {
    // now this function will push our data into the database
    if (datas.length === 0) {
        console.log('No data to insert.');
        // if there is nothing returned in the valid datas array
        // there will be no data to insert
        return;
    }

    const sql = "INSERT INTO mysql_table (first_name, last_name, age, email, phone, eircode) VALUES ?";
    // here is our sql syntax to insert the data into our table
    const values = datas.map(data => [data.first_name, data.last_name, data.age, data.email, data.phone, data.eircode]);
    // declaring the values to insert into our sql query

    connection.query(sql, [values], function (err, results) {
        // using our sql connection run the sql query
        if (err) {
            // print the error if there was one
            console.error("Error inserting datas into database:", err);
        } else {
            // otherwise tell us how many users we added into the db
            console.log(`${results.affectedRows} numbers of user data inserted successfully.`);
        }
    });
}

// now that we have declared all the functions we need 
// the validdatas variable will check our csvdata using our function
const validDatas = checkCSVData(csvData);

// and insert the data into db function to try and insert the checked and correct data into the table.

insertDataIntoDb(validDatas);
