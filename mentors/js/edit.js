//U = UPDATE
const url = 'http://localhost:3000/mentors'
const form = document.getElementById("form")
let mentorId = null 

const getMentorId = () => {
    const params = new URLSearchParams(window.location.search)
    const id = parseInt(params.get('id'))

    return id
}

const getMentor = async (id) => {
    const apiResponse = await fetch(`${url}/${id}`)
    const mentor = await apiResponse.json()

    return mentor
} 

const loadFormData = async (mentor) => {
    document.getElementById("name").value = mentor.name
    document.getElementById("email").value = mentor.email
}

const editMentor = async (id, mentor) => {
    await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mentor)
   })
   window.location = "../../mentors/html/index.html"
}

const loadData = async () => {
    mentorId = getMentorId() 
    const mentor = await getMentor(mentorId)
    loadFormData(mentor)
}

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const name = form.elements['name'].value
    const email = form.elements['email'].value

    const mentor = {
        name,
        email
    }

    editMentor(mentorId, mentor)
})

loadData()
//////////////////////////////////////////
//Redirecionamento das páginas 

//Botão para voltar para a página principal
const backButton = document.getElementById("backButton")

backButton.addEventListener ("click", function () {
    window.location.href = "../../mentors/html/index.html"
})

//"Side Menu"
const mentorsPage = document.getElementById("mentorsPage");
const mentorshipPage = document.getElementById("mentorshipPage");
const classesPage = document.getElementById("classesPage");
const studentsPage = document.getElementById("studentsPage");

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
