//Redirecionamento das páginas 

//Botão para voltar para a página principal
const backButton = document.getElementById("backButton")

backButton.addEventListener ("click", function () {
    window.location.href = "../mentors/html/mentor_index.html"
})

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
//////////////////////////////////////////