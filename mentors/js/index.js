const url = "https://api-projeto-modulo-1.onrender.com/mentors"; // API URL
let ascendingOrder = true; // Boolean variable to control sorting.
let mentors = []; // Variable that stores the mentors (initially empty).
let currentPage = 1; // Number of the current page in the pagination.
const mentorsPerPage = 6; // Maximum number of mentors displayed per page.
let totalMentors = 0; // Total number of mentors existing in the API. 

//...
// MODAL FOR DELETE
// Get the modal element by its ID
const modal = document.querySelector("#modal");
const deleteModal = document.querySelector("#deleteButton");

// Function to open the modal
const openModal = (mentorId) => {
  const modal = document.querySelector(`#deleteButton-${mentorId}`);
  modal.setAttribute("style", "display: block");

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal(mentorId);
    }
  });
};

const closeModal = (mentorId) => {
  const modal = document.querySelector(`#deleteButton-${mentorId}`);
  modal.setAttribute("style", "display: none");
};

// Function to display the list of mentors in the table dynamically
const showMentors = (mentorsData) => {
  const tableContent = document.getElementById("tableContent");
  let mentorHtml = "";

  mentorsData.forEach((mentor) => {
    mentorHtml += `
    <tr>
    <td>${mentor.name}</td>
    <td>${mentor.email}</td>
    <td>
          <button class="edit-button" onclick="edit(${mentor.id})"><i class="fa-solid fa-pencil" style="color: #004ce8;"></i></button>
          <button class="delete-button" onclick="openModal(${mentor.id})"><i class="fa-solid fa-trash" style="color: #ff3333;"></i></button>
        
          <div id="deleteButton-${mentor.id}" class="modal">
          <div class="modal-content">
          <span id="close" class="x" onclick="closeModal(${mentor.id})">&times;</span>
          <h1 class="modal-title">Excluir mentor</h1>
          <h3>Você tem certeza que deseja excluir o mentor?</h3>
          <div class="modal-flex">
          <button class="modal-buttons purple" onclick="closeModal(${mentor.id})">Cancelar</button>
          <button class="modal-buttons red" onclick="confirmDelete(${mentor.id})">Excluir</button>
          </div>
          </div>
          </div>
          </td>
          </tr>
          `;
  });

  tableContent.innerHTML = mentorHtml;
};

// Function to handle mentor deletion when the "Excluir" button is clicked
const confirmDelete = async (mentorId) => {
  try {
    const response = await fetch(`${url}/${mentorId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      console.log("Mentor deleted successfully");
      location.reload();
      // Refresh the mentors list after successful deletion
      await getMentors();
    } else {
      console.error("Error deleting the mentor!");
    }
  } catch (error) {
    console.error("An error occurred while deleting the mentor!", error);
  } finally {
    closeModal(mentorId); // Close the modal after attempting the deletion, regardless of success or failure.
  }
};

//...
//SORTING
const sortMentors = (mentorsData, order) => {
  const ascendingOrder = order === "asc";

  mentorsData.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (ascendingOrder) {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });

  showMentors(mentorsData); // Update the table after sorting
};

//...
//GET MENTORS
// Function to get the list of mentors from the API
const getMentors = async () => {
  try {
    const apiResponse = await fetch(url);
    mentors = await apiResponse.json();
    updateMentorsTable(); // Call the function to update the table after fetching data
  } catch (error) {
    console.error(error);
  }
};

getMentors();

//...
//PAGINATION

// Function to get the total number of mentors
const getTotalMentors = async () => {
  try {
    const response = await fetch(url);
    const mentorsData = await response.json();
    totalMentors = mentorsData.length;
    updatePaginationButtons();
  } catch (error) {
    console.error("Error on getting mentors:", error);
  }
};

// Function to get the mentors with pagination
const getMentorsPerPage = async (page, limit) => {
  try {
    const response = await fetch(`${url}?_page=${page}&_limit=${limit}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error on getting mentors:", error);
  }
};

const updateMentorsTable = async () => {
  try {
    const mentorsData = await getMentorsPerPage(currentPage, mentorsPerPage);
    showMentors(mentorsData);
    updatePaginationButtons();
  } catch (error) {
    console.error("Error getting mentors:", error);
  }
};

const updatePaginationButtons = () => {
  const previousButton = document.getElementById("previousButton");
  const nextButton = document.getElementById("nextButton");

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalMentors / mentorsPerPage);

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
    updateMentorsTable();
  }
};

const nextPage = () => {
  if (currentPage < Math.ceil(totalMentors / mentorsPerPage)) {
    currentPage++;
    updateMentorsTable();
  }
};

// Calls the function to get the total number of mentors before updating the table and setting the pagination buttons
getTotalMentors().then(() => {
  updateMentorsTable();
});

//...
// SEARCH INPUT (SEARCH BAR)
const searchInput = document.getElementById("searchInput");

// Function to filter mentors by name
const filterMentors = (mentors, searchTerm) => {
  searchTerm = searchTerm.toLowerCase();
  return mentors.filter((mentor) =>
    mentor.name.toLowerCase().includes(searchTerm)
  );
};

// Function to perform search and display filtered mentors
const searchMentors = async (searchTerm) => {
  try {
    const apiResponse = await fetch(`${url}`);
    const mentors = await apiResponse.json();
    const filteredMentors = filterMentors(mentors, searchTerm);
    showMentors(filteredMentors);
  } catch (error) {
    console.error(error);
  }
};

searchInput.addEventListener("keyup", (event) => {
  // Event listener to detect if the "Enter" key was pressed in the search
  if (event.key === "Enter") {
    const searchTerm = searchInput.value;
    searchMentors(searchTerm);
  }
});

//...
// PAGE REDIRECTION

//"Side Menu"
const mentorsPage = document.getElementById("mentorsPage");
const mentorshipPage = document.getElementById("mentorshipPage");
const classesPage = document.getElementById("classesPage");
const studentsPage = document.getElementById("studentsPage");

// Event listeners to redirect when clicking on menu pages
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

// "New Mentor" Button
const newButton = document.getElementById("newButton");

newButton.addEventListener("click", function () {
  window.location.href = "../../mentors/html/register.html";
});

// "Edit" Button
const edit = (id) => {
  window.location.href = `../../mentors/html/edit.html?id=${id}`;
};

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
