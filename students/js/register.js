// Button to go back to the main page
const backButton = document.getElementById("backButton");

// Event listener for the back button to redirect to the main students page
backButton.addEventListener("click", function () {
  window.location.href = "../../students/html/index.html";
});

//...
// Form and API URLs
const form = document.getElementById("formStudents");
const url = "https://api-projeto-modulo-1.onrender.com/students";
const url2 = "https://api-projeto-modulo-1.onrender.com/classes";

// Function to fetch the class data by its ID from the API
const getClass = async (id) => {
  const response = await fetch(`${url2}/${id}`);
  const className = await response.json();
  return className;
};

// Function to get the list of classes from the API
const getClasses = async () => {
  const response = await fetch(`${url2}`);
  const classes = await response.json();
  return classes;
};

// Function to load the classes into the select element
const loadSelect = async () => {
  const classes = await getClasses();
  const classSelect = document.getElementById("className");

  const emptyOption = new Option("Selecione uma turma...", null);
  classSelect.options.add(emptyOption);

  classes.forEach((className) => {
    const option = new Option(className.className, className.id);
    classSelect.options.add(option);
  });
};

// Function to register a new student
const registerStudent = async (student) => {
  try {
    await fetch(`${url}`, {
      method: "POST",
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });
    window.location = "../../students/html/index.html";
  } catch (error) {
    console.error(error);
  }
};

// Event listener for the form submit to handle student registration
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = form.elements["name"].value;
  const email = form.elements["email"].value;
  const className = form.elements["className"].value;

  const classObject = await getClass(className);
  if (Object.keys(classObject).length == 0) {
    console.log("Couldn't register the student, invalid class :/");
    return;
  }

  const student = {
    name,
    email,
    className: {
      id: classObject.id,
      name: classObject.className,
    },
  };
  registerStudent(student);
});

// Load the select element with the classes data
loadSelect();

//...
// USER DATA FROM LOCALSTORAGE

// Function to display the last registered user from localStorage
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