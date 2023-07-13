//Redirecionamento das páginas 

//"Side Menu"
const mentorsPage = document.getElementById("mentorsPage");
const mentorshipPage = document.getElementById("mentorshipPage");
const classesPage = document.getElementById("classesPage");
const studentsPage = document.getElementById("mentorsPage");

mentorsPage.addEventListener ("click", function () {
    window.location.href = "../mentors/html/mentor_index.html"
})

mentorshipPage.addEventListener ("click", function () {
    window.location.href = "../mentorship/mentorship_index.html"
})

classesPage.addEventListener ("click", function () {
    window.location.href = "../classes/classes_index.html"
})

studentsPage.addEventListener ("click", function () {
    window.location.href = "../students/students_index.html"
})

//Botão "Novo Mentor"
const newButton = document.getElementById("newButton")

newButton.addEventListener ("click", function () {
    window.location.href = "../mentors/html/mentor_register.html"
})

//Botão "Editar"
const editButton = document.getElementById("editButton")

editButton.addEventListener ("click", function() {
    window.location.href = "../mentors/html/mentor_edit.html"
})
//////////////////////////////////////////
