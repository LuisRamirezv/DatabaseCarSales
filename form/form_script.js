function validateUserInput(){

// There are a couple of input fields in the form 
// We must validate all user inputs 

// Documtent object model
// This DOM API will structure the HTML file
// and allow us to get elements 

// Document contains all the html elements 
// We could iterate through these elements one by one
// Or we could return a specific element using the id
// once we have this element we can access the value 
const firstName = document.getElementById("firstname").value;
const lastName = document.getElementById("lastname").value;
const password = document.getElementById("password").value;
const userType = document.getElementById("userType").value;




// To process the password 
// shift + 6 == ^
if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(password)){

    // Test the pasword for a criteria 
    alert("Password must contain Small letters capital letters and numbers!")
    
}           

// We need to test the first name last name and usertype


if(firstName && lastName && password){

    // If all three exist we must check the usertype
    if(userType == "Student"){
        // If this is not a student (Teacher) let them in 
        // Route the user (Teacher) to the home page 

        window.location.href = "home.html";

    }else{
        // If the user is not a teacher 
        // We canot let them in 
        // We throw an alert
        alert("Sorry, unable to grant you access! Only Teachers allowed.")
    }

}else{

    // If the inputs were not fully presented 
    // We need to let the user know to enter them again
    alert("Error: unable to sign you in, please make sure all fields are corretly filled out!")
}





}


