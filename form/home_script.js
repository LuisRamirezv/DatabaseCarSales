// Style the background in JS 
// Using the DOM API
// The body is what houses the background of the page 

const body = document.body; 
// Now we can access and manipulate the body of our page through this variable 

// Create a button toggle the background
// Call the button to check when it's clicked
// To call classes we use .
// To call IDs we use #
const button = document.querySelector(".button-container button");

// Create the logic
// Check what the current background is 
// Then change the background toa  different one 
// when the button is clicked
let background = 1; 

function toggleBackground(){

    // This is the function that we will sue to change the background
    //  The logic employe here must adhere to the requirements of the variable 
    background = background === 1 ? 2 : 1; //check the operator 
    // If the operator is 1 we want to assign background number 2

    body.classList.remove(`bg-${3-background}`); // remove the class of the current background 
    body.classList.add(`bg-${background}`);
    // The next thing we need to do is give the bg class
}

// Event Listener 
// The event listener takes in the method and function name
button.addEventListener("click", toggleBackground);






