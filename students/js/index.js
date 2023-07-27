const url = "https://api-projeto-modulo-1.onrender.com/students"; // API URL

//...
// MODAL FOR DELETE
// Get the modal element by its ID
const modal = document.querySelector("#modal");
const deleteModal = document.querySelector("#deleteButton");

// Function to open the modal
const openModal = (studentId) => {
  const modal = document.querySelector(`#deleteButton-${studentId}`);
  modal.setAttribute("style", "display: block");

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal(studentId);
    }
  });
};

// Function to close the modal
const closeModal = (studentId) => {
  const modal = document.querySelector(`#deleteButton-${studentId}`);
  modal.setAttribute("style", "display: none");
};

// Function to display student data in a table
const showStudent = (students) => {
  const tableContent = document.getElementById("tableContent");
  let studentHtml = "";

  students.forEach((student) => {
    studentHtml += `
      <tr>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>
          <button class="edit-button" id="editButton" onclick="edit(${student.id})">
            <i class="fa-solid fa-pencil" style="color: #004ce8;"></i>
          </button>
          <button class="delete-button" onclick="openModal(${student.id})">
            <i class="fa-solid fa-trash" style="color: #ff3333;"></i>
          </button>
        
          <div id="deleteButton-${student.id}" class="modal">
            <div class="modal-content">
              <span id="close" class="x" onclick="closeModal(${student.id})">&times;</span>
              <h1 class="modal-title">Excluir aluno</h1>
              <h3>Você tem certeza que deseja excluir o aluno?</h3>
              <div class="modal-flex">
                <button class="modal-buttons purple" onclick="closeModal(${student.id})">Cancelar</button>
                <button class="modal-buttons red" onclick="confirmDelete(${student.id})">Excluir</button>
              </div>
            </div>
          </div>
        </td>
      </tr>
    `;
  });

  tableContent.innerHTML = studentHtml;
};

// Function to handle student deletion when the "Excluir" button is clicked
const confirmDelete = async (studentId) => {
  try {
    const response = await fetch(`${url}/${studentId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      console.log("Student deleted successfully");
      // Refresh the students list after successful deletion
      await getstudents();
    } else {
      console.error("Error deleting the student!");
    }
  } catch (error) {
    console.error("An error occurred while deleting the student!", error);
  } finally {
    closeModal(studentId); // Close the modal after attempting the deletion, regardless of success or failure.
  }
};

// Function to get student data from the API and display them in a table
const getStudent = async () => {
  try {
    const apiResponse = await fetch(url);
    const students = await apiResponse.json();
    showStudent(students);
  } catch (error) {
    console.error(error);
  }
};
getStudent();
//...

// Input for search (Search Bar)
const searchInput = document.getElementById("searchInput");

// Function to filter student data based on the search term
const filterStudent = (students, searchTerm) => {
  searchTerm = searchTerm.toLowerCase();
  return students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm)
  );
};

// Function to perform a search for students based on the search term
const searchStudents = async (searchTerm) => {
  try {
    const apiResponse = await fetch(url);
    const students = await apiResponse.json();
    const filteredStudents = filterStudent(students, searchTerm);
    showStudent(filteredStudents);
  } catch (error) {
    console.error(error);
  }
};

// Event listener for the search input (Search Bar)
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const searchTerm = searchInput.value;
    searchStudents(searchTerm);
  }
});

//...
// Redirection to other pages

// "Side Menu"
const mentorsPage = document.getElementById("mentorsPage");
const mentorshipPage = document.getElementById("mentorshipPage");
const classesPage = document.getElementById("classesPage");
const studentsPage = document.getElementById("studentsPage");

// Event listeners for side menu redirection
mentorsPage.addEventListener("click", function () {
  window.location.href = "../../mentors/html/index.html";
});

mentorshipPage.addEventListener("click", function () {
  window.location.href = "../../mentorship/html/index.html";
});

classesPage.addEventListener("click", function () {
  window.location.href = "../../classes/html/index.html";
});

studentsPage.addEventListener("click", function () {
  window.location.href = "../../students/html/index.html";
});

// Button "New Student"
const newButton = document.getElementById("newButton");

// Event listener for the "New Student" button
newButton.addEventListener("click", function () {
  window.location.href = "../../students/html/register.html";
});

// Button "Edit"
const edit = (id) => {
  window.location.href = `../../students/html/edit.html?id=${id}`;
};

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