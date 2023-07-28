// Button to go back to the main page
const backButton = document.getElementById("backButton");

// Event listener to redirect back to the mentors page when the button is clicked
backButton.addEventListener("click", function () {
  window.location.href = "../../mentors/html/index.html";
});

const form = document.getElementById("form");
const url = "https://api-projeto-modulo-1.onrender.com/mentors";

// Function to register a new mentor on the API
const registerMentor = async (mentor) => {
  try {
    await fetch(`${url}`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mentor), // Convert mentor data to JSON and send in the request body
    });
    window.location = "../../mentors/html/index.html"; // Redirect back to the mentors page after registering
  } catch (error) {
    console.error(error);
  }
};

// Event listener for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the default form submission

  // Get the values from the form inputs
  const name = form.elements["name"].value;
  const email = form.elements["email"].value;

  // Check if both name and email are filled
  if (name.trim() === "" || email.trim() === "") {
    document.getElementById("error-message").textContent =
      "Por favor, preencha todos os campos!";
  } else {
    document.getElementById("error-message").textContent = "";

    // Create a mentor object with the form data
    const mentor = {
      name: name,
      email: email,
    };

    registerMentor(mentor); // Call the function to register the new mentor on the API
  }
});


//...
// USER DATA FROM LOCALSTORAGE

document.addEventListener("DOMContentLoaded", () => {
  const usersList = JSON.parse(localStorage.getItem("usersList")); // Retrieve the list of registered users from localStorage

  if (usersList && usersList.length > 0) {
    // If the list of users exists and is not empty, display the last registered user
    const lastUser = usersList[usersList.length - 1];
    document.getElementById("user-name").textContent = `${lastUser.name}`;
    document.getElementById("user-email").textContent = `${lastUser.email}`;
  } else {
    alert("User does not exist!");
  }
});