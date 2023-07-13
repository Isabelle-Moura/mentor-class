//Redirecionamento das páginas

//"Side Menu"
const mentorsPage = document.getElementById("mentorsPage");
const mentorshipPage = document.getElementById("mentorshipPage");
const classesPage = document.getElementById("classesPage");
const studentsPage = document.getElementById("mentorsPage");

mentorsPage.addEventListener("click", function () {
  window.location.href = "../mentors/html/mentor_index.html";
});

mentorshipPage.addEventListener("click", function () {
  window.location.href = "../mentorship/mentorship_index.html";
});

classesPage.addEventListener("click", function () {
  window.location.href = "../classes/classes_index.html";
});

studentsPage.addEventListener("click", function () {
  window.location.href = "../students/students_index.html";
});

//Botão para voltar para a página principal
const backButton = document.getElementById("backButton");

backButton.addEventListener("click", function () {
  window.location.href = "../mentors/html/mentor_index.html";
});

//Botão "Salvar"
// const saveButton = document.getElementById("saveButton");

// saveButton.addEventListener("click", function () {
//   window.location.href = "../mentors/mentor_index.html";
// });

//////////////////////////////////////////

//C = Create
const form = document.getElementById("form");
const url = "http://localhost:3000/mentors";

const registerMentor = async (mentor) => {
  await fetch(`${url}`, {
    method: "POST",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(autor),
  });

  window.location = "../mentors/html/mentor_index.html";
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = form.elements["name"].value;
  const email = form.elements["email"].value;

  const mentor = {
    name,
    email,
  };
  
  registerMentor(mentor);
});
//////////////////////////////////////////
