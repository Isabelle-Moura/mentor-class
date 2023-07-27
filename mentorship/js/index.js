const url = "https://api-projeto-modulo-1.onrender.com/mentorships";//API url
let ascendingOrder = true; // Variable to control sorting
let mentorships = []; // Declaration of the mentorships variable in the global scope
let currentPage = 1;
const mentorshipsPerPage = 6;
let totalMentorships = 0;

//...
// MODAL FOR DELETE
// Get the modal element by its ID
const modal = document.querySelector("#modal");
const deleteModal = document.querySelector("#deleteButton");

// Function to open the modal
const openModal = (mentorshipId) => {
  const modal = document.querySelector(`#deleteButton-${mentorshipId}`);
  modal.setAttribute("style", "display: block");

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal(mentorshipId);
    }
  });
};

const closeModal = (mentorshipId) => {
  const modal = document.querySelector(`#deleteButton-${mentorshipId}`);
  modal.setAttribute("style", "display: none");
};

const showMentorship = (mentorships) => {
  const tableContent = document.getElementById("tableContent");
  let mentorshipHtml = "";

  mentorships.forEach((mentorship) => {
    mentorshipHtml += `
      <tr>
        <td>${mentorship.mentorshipTitle}</td>
        <td>${mentorship.mentor.name}</td>
        <td class="${mentorship.status ? "toggle-active" : "toggle-inactive"}">${mentorship.status ? "Ativo" : "Inativo"}</td>
        <td>
          <button class="edit-button" id="editButton" onclick="edit(${mentorship.id})"><i class="fa-solid fa-pencil" style="color: #004ce8;"></i></button>
          <button class="delete-button" onclick="openModal(${mentorship.id})"><i class="fa-solid fa-trash" style="color: #ff3333;"></i></button>
          
          <div id="deleteButton-${mentorship.id}" class="modal">
          <div class="modal-content">
          <span id="close" class="x" onclick="closeModal(${mentorship.id})">&times;</span>
          <h1 class="modal-title">Excluir mentoria</h1>
          <h3>Você tem certeza que quer excluir mentoria?</h3>
          <div class="modal-flex">
          <button class="modal-buttons purple" onclick="closeModal(${mentorship.id})">Cancelar</button>
          <button class="modal-buttons red" onclick="confirmDelete(${mentorship.id})">Excluir</button>
          </div>
          </div>
          </div>
        </td>
      </tr>
    `;
  });

  tableContent.innerHTML = mentorshipHtml;
};

// Function to handle mentorship deletion when the "Delete" button is clicked
  const confirmDelete = async (mentorshipId) => {
    try {
      const response = await fetch(`${url}/${mentorshipId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Mentorship deleted successfully");
        location. reload();
        // Refresh the mentorships list after successful deletion
        await getmentorships();
  
        // Check if there is only one page and mentorships are empty
        if (totalMentorships === 1 && mentorships.length === 0) {
          currentPage = 1; // Set current page to 1
          await updateMentorshipsTable(); // Update the mentorships table with the new page
        }
      } else {
        console.error("Error deleting the mentorship!");
      }
    } catch (error) {
      console.error("An error occurred while deleting the mentorship!", error);
    } finally {
      closeModal(mentorshipId); // Close the modal after attempting the deletion, regardless of success or failure.
    }
  };
  

//GET MENTORSHIPS
const getMentorship = async () => {
  try {
    const apiResponse = await fetch(url);
    const mentorships = await apiResponse.json();

    showMentorship(mentorships);
    
  } catch (error) {
    console.error(error);
  }
};

getMentorship();

//...
// Function to get the total number of Mentorships
const getTotalMentorships = async () => {
  try {
    const response = await fetch(url);
    const mentorshipsData = await response.json();
    totalMentorships = mentorshipsData.length;
    updatePaginationButtons();
  } catch (error) {
    console.error("Erro ao obter o total de mentorias:", error);
  }
};

// Function to get the Mentorships with pagination
const getMentorshipsPerPage = async (page, limit) => {
  try {
    const response = await fetch(`${url}?_page=${page}&_limit=${limit}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting mentorships:", error);
  }
};

const updateMentorshipsTable = async () => {
  try {
    const mentorshipsData = await getMentorshipsPerPage(currentPage, mentorshipsPerPage);
    showMentorship(mentorshipsData);
    updatePaginationButtons();
  } catch (error) {
    console.error("Error getting mentorships:", error);
  }
};

const updatePaginationButtons = () => {
  const previousButton = document.getElementById("previousButton");
  const nextButton = document.getElementById("nextButton");

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalMentorships / mentorshipsPerPage);

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
    updateMentorshipsTable();
  }
};

const nextPage = () => {
  if (currentPage < Math.ceil(totalMentorships / mentorshipsPerPage)) {
    currentPage++;
    updateMentorshipsTable();
  }
};

// Calls the function to get the total number of Mentorships before updating the table and setting the pagination buttons
getTotalMentorships().then(() => {
  updateMentorshipsTable();
});

//...
// Search Input (Search Bar)
const searchInput = document.getElementById("searchInput");

// Function to filter mentorships by mentor's name
const filterMentorship = (mentorships, searchTerm) => {
  searchTerm = searchTerm.toLowerCase();
  return mentorships.filter((mentorship) => mentorship.mentor.name.toLowerCase().includes(searchTerm));
};

// Function to perform search and display filtered mentorships
const searchMentorships = async (searchTerm) => {
  const apiResponse = await fetch(url)
    .then((response) => response.json())
    .then((mentorships) => {
      const filteredMentorships = filterMentorship(mentorships, searchTerm);
      showMentorship(filteredMentorships);
    })
    .catch((error) => {
      console.error(error);
    });
};

searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const searchTerm = searchInput.value;
    searchMentorships(searchTerm);
  }
});

//...

// Page Redirection

// "Side Menu"
const mentorsPage = document.getElementById("mentorsPage");
const mentorshipPage = document.getElementById("mentorshipPage");
const classesPage = document.getElementById("classesPage");
const studentsPage = document.getElementById("studentsPage");

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

// Button "New Mentorship"
const newButton = document.getElementById("newButton");

newButton.addEventListener("click", function () {
  window.location.href = "../../mentorship/html/register.html";
});

// Button "Edit"
const edit = (id) => {
    window.location.href = `../../mentorship/html/edit.html?id=${id}`;    
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
