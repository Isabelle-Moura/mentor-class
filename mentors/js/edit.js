const url = "https://api-projeto-modulo-1.onrender.com/mentors"; // API URL
const form = document.getElementById("form"); // Get the form element
let mentorId = null; // Variable to store the mentor ID

// Function to extract the mentor ID from the URL query parameters
const getMentorIdUrl = () => {
  const paramsString = window.location.search;
  const params = new URLSearchParams(paramsString);
  mentorId = params.get("id"); // Get the value of 'id' from the query parameters
};

// Function to fetch the mentor data from the API based on the mentor ID
const getMentor = async () => {
  const apiResponse = await fetch(`${url}/${mentorId}`);
  const mentor = await apiResponse.json();
  console.log(mentor); // Display the mentor data in the console
  return mentor;
};

// Function to update the mentor data on the API
const editMentor = async (mentor) => {
  await fetch(`${url}/${mentorId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mentor), // Convert mentor data to JSON and send in the request body
  });
  window.location = "../../mentors/html/index.html"; // Redirect back to the mentors page after editing
};

// Function to load the mentor data into the form fields
const loadFormData = async (mentor) => {
  document.getElementById("name").value = mentor.name; // Set the name input value
  document.getElementById("email").value = mentor.email; // Set the email input value
};

// Function to load the mentor data and form data on page load
const loadData = async () => {
  getMentorIdUrl(); // Extract mentor ID from the URL
  const mentor = await getMentor(); // Fetch mentor data from the API
  loadFormData(mentor); // Load mentor data into the form fields
};

// Event listener for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the default form submission

  // Get the values from the form inputs
  const name = form.elements["name"].value;
  const email = form.elements["email"].value;

  // Create a mentor object with the form data
  const mentor = {
    name: name,
    email: email,
  };

  editMentor(mentor); // Call the function to update the mentor data on the API
});

loadData(); // Call the function to load mentor data and form data on page load

//...

// Button to go back to the main page
const backButton = document.getElementById("backButton");

// Event listener to redirect back to the mentors page when the button is clicked
backButton.addEventListener("click", function () {
  window.location.href = "../../mentors/html/index.html";
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