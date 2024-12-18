  function validateUserInput(event) {

  // Retrieve input values
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const eircode = document.getElementById("eircode").value;
  const age = document.getElementById("age").value;

  // Validate first name (alphanumeric, max length 20)
  if (!/^[a-zA-Z0-9]{1,20}$/.test(firstname)) {
  alert("First name must be alphanumeric and no longer than 20 characters.");
  event.preventDefault(); // Prevent form submission
  return;
  }

  // Validate last name (alphanumeric, max length 20)
  if (!/^[a-zA-Z0-9]{1,20}$/.test(lastname)) {
  alert("Last name must be alphanumeric and no longer than 20 characters.");
  event.preventDefault(); // Prevent form submission
  return;
  }

  // Validate email (must contain @ symbol and proper format)
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
  alert("Email must contain the @ symbol and be in a valid format.");
  event.preventDefault(); // Prevent form submission
  return;
  }

  // Validate phone number (exactly 10 digits)
  if (!/^\d{10}$/.test(phone)) {
  alert("Phone number must contain exactly 10 digits and only numbers.");
  event.preventDefault(); // Prevent form submission
  return;
  }

  // Validate age ()
  if (!/^(1[89]|[2-6][0-9])$/.test(age)) {
    alert("The age must be over 18 and under 70");
    event.preventDefault(); // Prevent form submission
    return;
    }
  // Validate eircode (must start with a number, alphanumeric, length 6)
  if (!/^[0-9][a-zA-Z0-9]{5}$/.test(eircode)) {
  alert("Eircode must start with a number, be alphanumeric, and have a length of 6 characters.");
  event.preventDefault(); // Prevent form submission
  return;
  }

  // If all fields are valid, submit the form

  }