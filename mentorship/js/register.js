// Button to go back to the main page
const backButton = document.getElementById("backButton");

backButton.addEventListener("click", function () {
  window.location.href = "../../mentorship/html/index.html";
});

//...

const form = document.getElementById("formMentorship");
const url1 = "https://api-projeto-modulo-1.onrender.com/mentorships";
const url2 = "https://api-projeto-modulo-1.onrender.com/mentors";

// Function to fetch mentor data by ID
const getMentor = async (id) => {
    const response = await fetch (`${url2}/${id}`);
    const mentor = await response.json();
    return mentor;
};

// Function to fetch all mentors
const getMentors = async () => {
    const response = await fetch (`${url2}`);
    const mentors = await response.json();
    return mentors;
};

// Function to load mentor select options
const loadSelect = async () => {
    const mentors = await getMentors();
    const mentorSelect = document.getElementById("mentor");

    const emptyOption = new Option('Selecione um mentor...', null);
    mentorSelect.options.add(emptyOption);
    
    mentors.forEach(mentor => {
        const option = new Option(mentor.name, mentor.id);
        mentorSelect.options.add(option);
    });
};

// Function to register a new mentorship
const registerMentorship = async (mentorship) => {
  try {
    await fetch(`${url1}`, {
      method: "POST",
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mentorship),
    });
    window.location = "../../mentorship/html/index.html";

  } catch (error) {
    console.error(error);
  }
};

// Event listener to handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const mentorshipTitle = form.elements['mentorshipTitle'].value;
  const mentor = form.elements['mentor'].value;
  const status = form.elements['toggle-input'].checked;

  const mentorObject = await getMentor(mentor);
  if (Object.keys(mentorObject).length == 0) {
    console.log("Unable to register the mentorship, invalid mentor :/");
    return;
  }

  const mentorship = {
    mentorshipTitle: mentorshipTitle,
    mentor: {
      id: mentorObject.id,
      name: mentorObject.name
    },
    status: status
  };

  registerMentorship(mentorship);
});

loadSelect();

//...
// GET USER DATA FROM LOCALSTORAGE
// In the JavaScript of the mentors page
document.addEventListener("DOMContentLoaded", () => {
  // Retrieve the list of registered users from localStorage
  const usersList = JSON.parse(localStorage.getItem("usersList"));

  if (usersList && usersList.length > 0) {
    // If the list of users exists and is not empty, display the last registered user
    const lastUser = usersList[usersList.length - 1];
    document.getElementById("user-name").textContent = `${lastUser.name}`;
    document.getElementById("user-email").textContent = `${lastUser.email}`;
  } else {
    alert("User does not exist!")
  }
});