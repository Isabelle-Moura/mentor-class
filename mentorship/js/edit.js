const formMentorship = document.getElementById("formMentorship");
let mentorshipId = null;
const url = "https://api-projeto-modulo-1.onrender.com/mentorships"; 
const url2 = "https://api-projeto-modulo-1.onrender.com/mentors"

// Function to fetch mentor data by ID
const getMentor = async (id) => {
    const response = await fetch (`${url2}/${id}`)
    const mentor = await response.json()
    return mentor
}

// Function to fetch all mentors
const getMentors = async () => {
    const response = await fetch (`${url2}`)
    const mentors = await response.json()
    return mentors
}

// Function to load mentor select options
const loadSelect = async (id) => {
    const mentors = await getMentors()
    const mentorSelect = document.getElementById("mentor")

    const emptyOption = new Option('Selecione um mentor...', null)
    mentorSelect.options.add(emptyOption)
    
    mentors.forEach(mentor => {
        const option = new Option(mentor.name, mentor.id)
        mentorSelect.options.add(option)
    })
}

// Function to get the mentorship ID from the URL
const getMentorshipIdUrl = () => {
  const paramsString = window.location.search;
  const params = new URLSearchParams(paramsString);
  mentorshipId = params.get("id");
};

// Function to fetch a mentorship by ID
const getMentorship = async () => {
  const apiResponse = await fetch(`${url}/${mentorshipId}`);
  const mentorship = await apiResponse.json();
  return mentorship;
};

// Function to handle mentorship update
const editMentorship = async (mentorship) => {
  await fetch(`${url}/${mentorshipId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mentorship),
  });
  window.location = "../../mentorship/html/index.html";
};

// Function to load form data
const loadFormData = async (mentorship) => {
  loadSelect()
  document.getElementById("mentorshipTitle").value = mentorship.mentorshipTitle;
  document.getElementById("toggle-input").checked = mentorship.status;
  const select = document.getElementById('mentor')
  const mentors = await getMentors()

  for (let counter = 1; counter <= mentors.length; counter++) {
    if (select.options[counter].innerText === mentorship.mentor.name) {
      select.options[counter].selected = true;
    }
  }
};

// Function to load mentorship data and handle form submission
const loadData = async () => {
  getMentorshipIdUrl();
  const mentorship = await getMentorship();
  loadFormData(mentorship);
};

formMentorship.addEventListener("submit", async (e) => {
  e.preventDefault();

  const mentorshipTitle = formMentorship.elements["mentorshipTitle"].value;
  const mentor = formMentorship.elements["mentor"].value;
  const status = formMentorship.elements["toggle-input"].checked;

  const mentorObject = await getMentor(mentor);

  if (Object.keys(mentorObject).length == 0) {
    console.log("Unable to register the mentorship, invalid mentor :/");
    return;
  }

  const mentorship = {
    mentorshipTitle: mentorshipTitle,
    mentor: {
      id: mentorObject.id,
      name: mentorObject.name,
    },
    status: status,
  };

  editMentorship(mentorship);
});

loadData();

//...

// Button to go back to the main page
const backButton = document.getElementById("backButton");

backButton.addEventListener("click", function () {
  window.location.href = "../../mentorship/html/index.html";
});

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