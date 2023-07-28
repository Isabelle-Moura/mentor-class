const url = "https://api-projeto-modulo-1.onrender.com/classes"; // API URL.
let ascendingOrder = true; // Boolean variable to control sorting.
let classes = []; // Variable that stores the classes (initially empty).
let currentPage = 1; // Number of the current page in the pagination.
const classesPerPage = 6; // Maximum number of classes displayed per page.
let totalClasses = 0; // Total number of classes existing in the API.

//...
// MODAL FOR DELETE
// Get the modal element by its ID
const modal = document.querySelector("#modal");
const deleteModal = document.querySelector("#deleteButton");

// Function to open the modal
const openModal = (classId) => {
  const modal = document.querySelector(`#deleteButton-${classId}`);
  modal.setAttribute("style", "display: block");

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal(classId);
    }
  });
};

const closeModal = (classId) => {
  const modal = document.querySelector(`#deleteButton-${classId}`);
  modal.setAttribute("style", "display: none");
};

// Function to display the list of classes on the table
const showClasses = (classes) => {
  const tableContent = document.getElementById("tableContent");
  let classHtml = "";

  classes.forEach((classData) => {
    // Create rows for each class and fill the table with class data
    classHtml += `
      <tr>
        <td>${classData.className}</td>
        <td>${classData.mentorName.name}</td>
        <td style="max-width: 120px;">${classData.mentorship.mentorship}</td>
        <td>${classData.beginning}</td>
        <td>${classData.weekday}</td>
        <td>${classData.beginningTime + "-" + classData.endingTime}</td>
        <td>${classData.meetQuantity}</td>
        <td>
          <button class="edit-button" id="editButton" onclick="edit(${classData.id})"><i class="fa-solid fa-pencil" style="color: #004ce8;"></i></button>
          <button class="delete-button" onclick="openModal(${classData.id})"><i class="fa-solid fa-trash" style="color: #ff3333;"></i></button>
          
          <div id="deleteButton-${classData.id}" class="modal">
            <div class="modal-content">
              <span id="close" class="x" onclick="closeModal(${classData.id})">&times;</span>
              <h1 class="modal-title">Excluir turma</h1>
              <h3>Você tem certeza que deseja excluir a turma?</h3>
              <div class="modal-flex">
                <button class="modal-buttons purple" onclick="closeModal(${classData.id})">Cancelar</button>
                <button class="modal-buttons red" onclick="confirmDelete(${classData.id})">Excluir</button>
              </div>
            </div>
          </div>
        </td>
      </tr>
    `;
  });

  tableContent.innerHTML = classHtml;
};

// Function to handle class deletion when the "Excluir" button is clicked
const confirmDelete = async (classId) => {
  try {
    const response = await fetch(`${url}/${classId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      console.log("Class deleted successfully");
      location.reload();
      // Refresh the classes list after successful deletion
      await getClasses();
    } else {
      console.error("Error deleting the class!");
    }
  } catch (error) {
    console.error("An error occurred while deleting the class!", error);
  } finally {
    closeModal(classId); // Close the modal after attempting the deletion, regardless of success or failure.
  }
};

//...
//SORTING
const sortClasses = (classesData, order) => {
  const ascendingOrder = order === "asc";

  classesData.sort((a, b) => {
    const nameA = a.className.toLowerCase();
    const nameB = b.className.toLowerCase();

    if (ascendingOrder) {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });

  showClasses(classesData); // Update the table after sorting
};

// GET CLASSES
// Function to get the list of classes from the API
const getClasses = async () => {
  try {
    const apiResponse = await fetch(url);
    classes = await apiResponse.json();
    updateClassesTable()

    showClasses(classes);
  } catch (error) {
    console.error(error);
  }
};

getClasses();
//...

//...
//PAGINATION

// Function to get the total number of Classes
const getTotalClasses = async () => {
  try {
    const response = await fetch(url);
    const classesData = await response.json();
    totalClasses = classesData.length;
    updatePaginationButtons();
  } catch (error) {
    console.error("Error on getting the total of classes:", error);
  }
};

// Function to get the classes with pagination
const getClassesPerPage = async (page, limit) => {
  try {
    const response = await fetch(`${url}?_page=${page}&_limit=${limit}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error on getting classes:", error);
  }
};

const updateClassesTable = async () => {
  try {
    const classesData = await getClassesPerPage(currentPage, classesPerPage);
    showClasses(classesData);
    updatePaginationButtons();
  } catch (error) {
    console.error("Error getting classes:", error);
  }
};

const updatePaginationButtons = () => {
  const previousButton = document.getElementById("previousButton");
  const nextButton = document.getElementById("nextButton");

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalClasses / classesPerPage);

  // Check if there is only one page or no content to paginate
  if (totalPages <= 1) {
    // Disable both "Previous" and "Next" buttons
    previousButton.disabled = true;
    nextButton.disabled = true;

    // Set cursor to "not-allowed" for both buttons
    previousButton.style.cursor = "not-allowed";
    nextButton.style.cursor = "not-allowed";
  } else {
    // Handle previous button state
    if (currentPage === 1) {
      // Disable "Previous" button on the first page
      previousButton.disabled = true;
      previousButton.style.cursor = "not-allowed";
    } else {
      previousButton.disabled = false;
      previousButton.style.cursor = "pointer";
    }

    // Handle next button state
    if (currentPage === totalPages) {
      // Disable "Next" button on the last page
      nextButton.disabled = true;
      nextButton.style.cursor = "not-allowed";
    } else {
      nextButton.disabled = false;
      nextButton.style.cursor = "pointer";
    }
  }
};

const previousPage = () => {
  if (currentPage > 1) {
    currentPage--;
    updateClassesTable();
  }
};

const nextPage = () => {
  if (currentPage < Math.ceil(totalClasses / classesPerPage)) {
    currentPage++;
    updateClassesTable();
  }
};

// Calls the function to get the total number of classes before updating the table and setting the pagination buttons
getTotalClasses().then(() => {
  updateClassesTable();
});

//...
// Input for search (Search Bar)
const searchInput = document.getElementById("searchInput");

// Function to filter classes based on the search term
const filterClasses = (classes, searchTerm) => {
  searchTerm = searchTerm.toLowerCase();
  return classes.filter((classData) => {
    const mentorName = classData.mentorName.name.toLowerCase();
    const className = classData.className.toLowerCase();
    return mentorName.includes(searchTerm) || className.includes(searchTerm); // Will search both by class name and mentor name
  });
};

// Function to handle the search when the "Enter" key is pressed
const searchClasses = async (searchTerm) => {
  try {
    const apiResponse = await fetch(`${url}`);
    const classes = await apiResponse.json();
    const filteredClasses = filterClasses(classes, searchTerm);
    showClasses(filteredClasses);
  } catch (error) {
    console.error(error);
  }
};

searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const searchTerm = searchInput.value;
    searchClasses(searchTerm);
  }
});

//...

// Redirection to other pages

// "Side Menu"
const mentorsPage = document.getElementById("mentorsPage");
const mentorshipPage = document.getElementById("mentorshipPage");
const classesPage = document.getElementById("classesPage");
const studentsPage = document.getElementById("studentsPage");

// Event listeners for each menu option to redirect to the respective page
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

// Button "New Class"
const newButton = document.getElementById("newButton");

// Event listener for the "New Class" button to redirect to the registration page
newButton.addEventListener("click", function () {
  window.location.href = "../../classes/html/register.html";
});

// Button "Edit"
const edit = (id) => {
  window.location.href = `../../classes/html/edit.html?id=${id}`
}

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