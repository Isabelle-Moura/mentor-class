const url = "https://api-projeto-modulo-1.onrender.com/mentorships";//API url

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
        <td class="${mentorship.status ? "toggle-active" : "toggle-inactive"}">${mentorship.status ? "Active" : "Inactive"}</td>
        <td>
          <button class="edit-button" id="editButton" onclick="edit(${mentorship.id})"><i class="fa-solid fa-pencil" style="color: #004ce8;"></i></button>
          <button class="delete-button" onclick="openModal(${mentorship.id})"><i class="fa-solid fa-trash" style="color: #ff3333;"></i></button>
          
          <div id="deleteButton-${mentorship.id}" class="modal">
          <div class="modal-content">
          <span id="close" class="x" onclick="closeModal(${mentorship.id})">&times;</span>
          <h1 class="modal-title">Delete mentorship</h1>
          <h3>Are you sure you want to delete this mentorship?</h3>
          <div class="modal-flex">
          <button class="modal-buttons purple" onclick="closeModal(${mentorship.id})">Cancel</button>
          <button class="modal-buttons red" onclick="confirmDelete(${mentorship.id})">Delete</button>
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
      // Refresh the mentorships list after successful deletion
      await getmentorships();
    } else {
      console.error("Error deleting the mentorship!");
    }
  } catch (error) {
    console.error("An error occurred while deleting the mentorship!", error);
  } finally {
    closeModal(mentorshipId); // Close the modal after attempting the deletion, regardless of success or failure.
  }
};

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

const deleteButton = async (mentorshipId) => {
    try {
      const response = await fetch(`${url}/${mentorshipId}`, {
        method: 'DELETE',
      })
        console.log(response);
        if (response.ok) {
          console.log('Mentorship deleted successfully');
        } else {
          console.error('Error deleting the mentorship!');
        }

    } catch (error) {
      console.error('An error occurred while deleting the mentorship!', error);
    }
  };

// Retrieve user data from localStorage
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
