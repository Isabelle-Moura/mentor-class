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
let studentId = null;// Variable to store the student ID from the URL query parameters

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

// Function to extract the student ID from the URL query parameters
const getStudentIdUrl = () => {
  const paramsString = window.location.search;
  const params = new URLSearchParams(paramsString);
  studentId = params.get("id");
};

// Function to get the student data from the API
const getStudent = async () => {
  const apiResponse = await fetch(`${url}/${studentId}`);
  const student = await apiResponse.json();
  return student;
};

// Function to update the student data via the API
const editStudent = async (student) => {
  await fetch(`${url}/${studentId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });
  window.location = "../../students/html/index.html";
};

// Function to load the student data into the form for editing
const loadFormData = async (student) => {
  loadSelect();
  document.getElementById("name").value = student.name;
  document.getElementById("email").value = student.email;

  const classSelect = document.getElementById("className");
  const className = await getClasses();
  const classIndex = className.findIndex(
    (classData) => classData.id === student.className.id
  );

  if (classIndex !== -1) {
    classSelect.options[classIndex + 1].selected = true;
  }
};

// Function to load the student data for editing when the page is loaded
const loadData = async () => {
  getStudentIdUrl();
  const student = await getStudent();
  loadFormData(student);
};

// Event listener for the form submit to handle student editing
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
  editStudent(student);
});

// Load the student data for editing when the page is loaded
loadData();

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
