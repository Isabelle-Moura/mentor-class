const formClasses = document.getElementById("formClasses");
const url = "https://api-projeto-modulo-1.onrender.com/classes";
const url1 = "https://api-projeto-modulo-1.onrender.com/mentorships";
const url2 = "https://api-projeto-modulo-1.onrender.com/mentors";
let classId = null;

// Function to fetch mentorship data based on ID
const getMentorship = async (id) => {
  const response = await fetch(`${url1}/${id}`);
  const mentorship = await response.json();
  return mentorship;
};

// Function to fetch all mentorships
const getMentorships = async () => {
  const response = await fetch(`${url1}`);
  const mentorships = await response.json();
  return mentorships;
};

// Function to load the mentorship select options
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

// Function to fetch mentor data based on ID
const getMentor = async (id) => {
  const response = await fetch(`${url2}/${id}`);
  const mentor = await response.json();
  return mentor;
};

// Function to fetch all mentors
const getMentors = async () => {
  const response = await fetch(`${url2}`);
  const mentors = await response.json();
  return mentors;
};

// Function to load the mentor select options
const loadMentorsSelect = async () => {
  const mentors = await getMentors();
  const mentorSelect = document.getElementById("mentorName");

  const emptyOption = new Option("Selecione um mentor...", null);
  mentorSelect.options.add(emptyOption);

  mentors.forEach((mentor) => {
    const option = new Option(
      mentor.name + " " + "(" + mentor.email + ")",
      mentor.id
    );
    mentorSelect.options.add(option);
  });
};

// Function to extract the class ID from the URL parameters
const getClassIdUrl = () => {
  const paramsString = window.location.search;
  const params = new URLSearchParams(paramsString);
  classId = params.get("id");
};

// Function to fetch the class data based on the class ID
const getClass = async () => {
  const apiResponse = await fetch(`${url}/${classId}`);
  const classData = await apiResponse.json();
  return classData;
};

// Function to handle class editing
const editClass = async (classData) => {
  await fetch(`${url}/${classId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(classData),
  });
  window.location = "../../classes/html/index.html";
};

// Function to load form data for class editing
const loadFormData = async (classData) => {
  loadMentorsSelect();
  loadMentorshipsSelect();

  // Fill the form fields with class data
  document.getElementById("className").value = classData.className;
  document.getElementById("beginning").value = classData.beginning;
  document.getElementById("weekday").value = classData.weekday;
  document.getElementById("beginningTime").value = classData.beginningTime;
  document.getElementById("classLink").value = classData.classLink;
  document.getElementById("endingTime").value = classData.endingTime;
  document.getElementById("meetQuantity").value = classData.meetQuantity;

  // Select the corresponding mentor and mentorship in the dropdowns
  const mentorSelect = document.getElementById("mentorName");
  const mentors = await getMentors();
  const mentorIndex = mentors.findIndex(
    (mentor) => mentor.name === classData.mentorName.name
  );
  if (mentorIndex !== -1) {
    mentorSelect.options[mentorIndex + 1].selected = true;
  }

  const mentorshipSelect = document.getElementById("mentorship");
  const mentorships = await getMentorships();
  const mentorshipIndex = mentorships.findIndex(
    (mentorship) =>
      mentorship.mentorshipTitle === classData.mentorship.mentorship
  );
  if (mentorshipIndex !== -1) {
    mentorshipSelect.options[mentorshipIndex + 1].selected = true;
  }
};

// Function to load data for class editing
const loadData = async () => {
  getClassIdUrl();
  const classData = await getClass();
  loadFormData(classData);
};

// Event listener for form submission (class editing)
formClasses.addEventListener("submit", async (e) => {
  e.preventDefault();
  const mentorship = formClasses.elements["mentorship"].value;
  const mentorName = formClasses.elements["mentorName"].value;
  const beginning = formClasses.elements["beginning"].value;
  const weekday = formClasses.elements["weekday"].value;
  const beginningTime = formClasses.elements["beginningTime"].value;
  const endingTime = formClasses.elements["endingTime"].value;
  const className = formClasses.elements["className"].value;
  const classLink = formClasses.elements["classLink"].value;
  const meetQuantity = formClasses.elements["meetQuantity"].value;

  const mentorshipObject = await getMentorship(mentorship);
  if (Object.keys(mentorshipObject).length == 0) {
    console.log("Unable to register the class, invalid mentorship :/");
  }

  const mentorObject = await getMentor(mentorName);
  if (Object.keys(mentorObject).length == 0) {
    console.log("Unable to register the class, invalid mentor :/");
  }

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
  editClass(classData);
});

// Load data for editing the class
loadData();
//...

// Button to go back to the main page
const backButton = document.getElementById("backButton");

backButton.addEventListener("click", function () {
  window.location.href = "../../classes/html/index.html";
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