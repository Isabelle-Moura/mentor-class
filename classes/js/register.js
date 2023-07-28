// Get the back button element by its ID
const backButton = document.getElementById("backButton");

// Add event listener to the back button to redirect to the main page
backButton.addEventListener("click", function () {
  window.location.href = "../../classes/html/index.html";
});

//...
// Get the form element by its ID
const formClasses = document.getElementById("formClasses");

// URLs for API endpoints
const url = "https://api-projeto-modulo-1.onrender.com/classes";
const url1 = "https://api-projeto-modulo-1.onrender.com/mentorships";
const url2 = "https://api-projeto-modulo-1.onrender.com/mentors";

// Function to validate form fields
const isFormValid = () => {
  const mentorship = formClasses.elements["mentorship"].value;
  const mentorName = formClasses.elements["mentorName"].value;
  const beginning = formClasses.elements["beginning"].value;
  const weekday = formClasses.elements["weekday"].value;
  const beginningTime = formClasses.elements["beginningTime"].value;
  const endingTime = formClasses.elements["endingTime"].value;
  const className = formClasses.elements["className"].value;
  const classLink = formClasses.elements["classLink"].value;
  const meetQuantity = formClasses.elements["meetQuantity"].value;

  return (
    mentorship !== "" &&
    mentorName !== "" &&
    beginning !== "" &&
    weekday !== "" &&
    beginningTime !== "" &&
    endingTime !== "" &&
    className !== "" &&
    classLink !== "" &&
    meetQuantity !== ""
  );
};

// Function to get a mentorship by its ID from the API
const getMentorship = async (id) => {
  if (id == null) {
    return false;
  }
  const response = await fetch(`${url1}/${id}`);
  const mentorship = await response.json();
  return mentorship;
};

// Function to get all mentorships from the API
const getMentorships = async () => {
  const response = await fetch(`${url1}`);
  const mentorships = await response.json();
  return mentorships;
};

// Function to load mentorships into the select element
const loadMentorshipsSelect = async () => {
  const mentorships = await getMentorships();
  const mentorshipSelect = document.getElementById("mentorship");

  const emptyOption = new Option("Selecione uma mentoria...", null);
  mentorshipSelect.options.add(emptyOption);

  mentorships.forEach((mentorship) => {
    const option = new Option(mentorship.mentorshipTitle, mentorship.id);
    mentorshipSelect.options.add(option);
  });
  console.log(mentorshipSelect);
};

// Function to get a mentor by its ID from the API
const getMentor = async (id) => {
  if (id == null) {
    return false;
  }
  const response = await fetch(`${url2}/${id}`);
  const mentor = await response.json();
  return mentor;
};

// Function to get all mentors from the API
const getMentors = async () => {
  const response = await fetch(`${url2}`);
  const mentors = await response.json();
  return mentors;
};

// Function to load mentors into the select element
const loadMentorsSelect = async () => {
  const mentors = await getMentors();
  const mentorSelect = document.getElementById('mentorName');

  const emptyOption = new Option('Selecione um mentor...', null);
  mentorSelect.options.add(emptyOption);

  mentors.forEach(mentor => {
    const option = new Option(mentor.name + " " + "(" + mentor.email + ")", mentor.id);
    mentorSelect.options.add(option);
  });
  console.log(mentorSelect);
};

// Function to register a new class to the API
const registerClass = async (className) => {
  try {
    await fetch(`${url}`, {
      method: "POST",
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(className)
    });
    window.location = "../../classes/html/index.html";
  } catch (error) {
    console.error(error);
  }
};

// Event listener for the form submission
formClasses.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (isFormValid()) {
    // Get form values
    const mentorship = formClasses.elements["mentorship"].value;
    const mentorName = formClasses.elements["mentorName"].value;
    const beginning = formClasses.elements["beginning"].value;
    const weekday = formClasses.elements["weekday"].value;
    const beginningTime = formClasses.elements["beginningTime"].value;
    const endingTime = formClasses.elements["endingTime"].value;
    const className = formClasses.elements["className"].value;
    const classLink = formClasses.elements["classLink"].value;
    const meetQuantity = formClasses.elements["meetQuantity"].value;

    // Get mentorship and mentor objects from the API
    const mentorshipObject = await getMentorship(mentorship);
    if (Object.keys(mentorshipObject).length === 0) {
      console.log("Não foi possível cadastrar a turma, mentoria inválida :/");
      return;
    }

    const mentorObject = await getMentor(mentorName);
    if (Object.keys(mentorObject).length === 0) {
      console.log("Não foi possível cadastrar a turma, mentor inválido :/");
      return;
    }

    // Create class data object
    const classData = {
      mentorName: {
        id: mentorObject.id,
        name: mentorObject.name,
      },
      mentorship: {
        id: mentorshipObject.id,
        mentorship: mentorshipObject.mentorshipTitle,
      },
      beginning,
      weekday,
      beginningTime,
      endingTime,
      className,
      classLink,
      meetQuantity,
    };

    // Register the class
    registerClass(classData);
  } else {
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = "Por favor, preencha todos os campos!";
  }
});

// Load mentorships and mentors into the respective select elements
loadMentorshipsSelect();
loadMentorsSelect();

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