// Here we are going to declare a couple of 
// variables and test them

// THe tests will be to see if the variable method declration 
// Affects it's accesibility 

//  () is inputs
//  {} are the functin code block (function scope)

function checkY(){

    // Logic goes here
    var x = 10;
    
    //  Instatiate this variable using var
    // Function scope
    if(true){
        // Block scope 
        // Create a second variable called y 
        var y = 20;
    }
    // Function scope
    // To test these variables properties we will call them at the end here

    console.log("Function scope: ", x)
    console.log("Block Scope " ,y)
}

// Call the function to run the function


// checkY();


function checkY(){

    // THis time we will use the let declarartion 

    let x = 15; // function coped

    if(true){
        // Code block scope 

        let y = 10; // block scoped 
    } 
    //Flush y 

    // Function scope 
    // Call on both the function scope variable and 
    // The block scope variable 

    console.log(x); // function scope 
    console.log(y);// block scope 


}

// checkY();



// Creating a constant variable means 
// The values dont change (Cannot be altered)
const PI = 3.14159;

// PI = 3.14; // Trying to change a constant value



//  However we can reassign and change the attributes values 
// Not the const value

const person = {age:67};// Creating a person data structure (dictionary)
// The key is the const attribute that cannot be changed
// However we can reassign the attribute value

console.log(person);
// To access a value from a dictionary 
// We have to use the path refencing 
// We use the full stop to access these paths object . attribute
person.name = "Tom";
console.log(person);

// const person = {age:35}; // changing the key/ object --> thi is not allowed

const database = {db_name,
                    id,
                    ip,
                    password,
                    username
}
// console.log(person);