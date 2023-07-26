const url = "https://api-projeto-modulo-1.onrender.com/mentors"; // API URL
let ascendingOrder = true; // Variable to control sorting
let mentors = []; // Declaration of the mentors variable in the global scope

// Constants for pagination
const mentorsPerPage = 7;
let currentPage = 1;

//////////////////////////////////////////
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
        <button class="edit-button" id="editButton" onclick="edit(${mentor.id})"><i class="fa-solid fa-pencil" style="color: #004ce8;"></i></button>
        <button class="delete-button" id="deleteButton" onclick="deleteButton(${mentor.id})"><i class="fa-solid fa-trash" style="color: #ff3333;"></i></button>
      </td>
    </tr>
    `;
  });

  tableContent.innerHTML = mentorHtml;
};

//////////////////////////////////////////
// Function to sort the list of mentors by name

const sortMentorsByName = (mentorsData, order) => {
  const sortedMentors = [...mentorsData];

  sortedMentors.sort((a, b) => {
    if (order === "asc") {
      return a.name.localeCompare(b.name); // Ascending order (A-Z)
    } else {
      return b.name.localeCompare(a.name); // Descending order (Z-A)
    }
  });

  return sortedMentors;
};

// Select element for sorting
const orderSelect = document.getElementById("orderSelect");

// Event listener to detect changes in sorting
orderSelect.addEventListener("change", () => {
  currentPage = 1; // Reset the current page to 1 when the sorting order changes
  displayMentors(mentors, currentPage, mentorsPerPage);
});

// Function to paginate mentors based on the current page and limit
const paginateMentors = (mentorsData, page, perPage) => {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  return mentorsData.slice(startIndex, endIndex);
};

// Function to display mentors for the given page and sorting order
const displayMentors = (mentorsData, page, perPage) => {
  const sortedMentors = sortMentorsByName(mentorsData, orderSelect.value);
  const paginatedMentors = paginateMentors(sortedMentors, page, perPage);
  showMentors(paginatedMentors);
};

// Function to handle pagination button click
const handlePaginationClick = (pageNum) => {
  currentPage = pageNum;
  displayMentors(mentors, currentPage, mentorsPerPage);
};

// Function to create pagination buttons
const createPaginationButtons = (totalPages) => {
  const paginationContainer = document.getElementById("paginationContainer");
  paginationContainer.innerHTML = ""; // Clear previous pagination buttons

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.classList.add("pagination-button");

    // Highlight the active page button
    if (i === currentPage) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      handlePaginationClick(i);
    });

    paginationContainer.appendChild(button);
  }
};

// Function to calculate total number of pages
const getTotalPages = (mentorsData, perPage) => {
  return Math.ceil(mentorsData.length / perPage);
};

//////////////////////////////////////////
// Function to get the list of mentors from the API
const getMentors = async () => {
  try {
    const apiResponse = await fetch(url);
    mentors = await apiResponse.json(); // Assign API data to the mentors variable
    const totalPages = getTotalPages(mentors, mentorsPerPage);
    createPaginationButtons(totalPages);
    displayMentors(mentors, currentPage, mentorsPerPage);
  } catch (error) {
    console.error(error);
  }
};

getMentors(); // Call the function to get mentors on page load

//////////////////////////////////////////
// Search Input (Search Bar)
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

//////////////////////////////////////////
// Page Redirection

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
  // Event listener to redirect when clicking on the "New Mentor" button
  window.location.href = "../../mentors/html/register.html";
});

// "Edit" Button
const edit = (id) => {
  window.location.href = `../../mentors/html/edit.html?id=${id}`;
};

// Function to delete a mentor
const deleteMentor = async (mentorId) => {
  try {
    const response = await fetch(`${url}/${mentorId}`, {
      method: "DELETE",
    });
    console.log(response);
    if (response.ok) {
      console.log("Mentor deleted successfully");
      // Refresh the mentors list after successful deletion
      await getMentors();
    } else {
      console.error("Error deleting the mentor!");
    }
  } catch (error) {
    console.error("An error occurred while deleting the mentor!", error);
  }
};

// Function to delete a mentor
const deleteButton = async (mentorId) => {
  // Open the confirmation modal when the delete button is clicked
  const deleteConfirmationModal = new bootstrap.Modal(
    document.getElementById("deleteConfirmationModal")
  );
  deleteConfirmationModal.show();

  // Store the mentorId in a data attribute of the delete button in the modal
  document
    .getElementById("confirmDeleteButton")
    .setAttribute("data-mentor-id", mentorId);
};

// Event listener for the "Delete" button in the confirmation modal
document
  .getElementById("confirmDeleteButton")
  .addEventListener("click", async () => {
    const mentorId = document
      .getElementById("confirmDeleteButton")
      .getAttribute("data-mentor-id");
    await deleteMentor(mentorId); // Call the actual function to delete the mentor
    // Close the confirmation modal after deleting the mentor
    const deleteConfirmationModal = new bootstrap.Modal(
      document.getElementById("deleteConfirmationModal")
    );
    deleteConfirmationModal.hide();
  });

//////////////////////////////////////////
// Get user data from localStorage

document.addEventListener("DOMContentLoaded", () => {
  // In the JavaScript of the mentors page

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
