//U = UPDATE
const url = 'https://api-projeto-modulo-1.onrender.com/mentors'
const form = document.getElementById("form")
let mentorId = null 

const getMentorIdUrl = () => {
    const paramsString = window.location.search
    const params = new URLSearchParams(paramsString)
    mentorId = params.get('id')
}

const getMentor = async () => {
    const apiResponse = await fetch(`${url}/${mentorId}`)
    const mentor = await apiResponse.json()
    console.log(mentor)

    return mentor
} 

const editMentor = async (mentor) => {
    await fetch(`${url}/${mentorId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mentor)
   })
   window.location = "../../mentors/html/index.html"
}

const loadFormData = async (mentor) => {
    document.getElementById("name").value = mentor.name
    document.getElementById("email").value = mentor.email
}

const loadData = async () => {
    getMentorIdUrl() 
    const mentor = await getMentor()
    loadFormData(mentor)
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const name = form.elements['name'].value
    const email = form.elements['email'].value

    const mentor = {
        "name": name,
        "email": email
    }

    editMentor(mentor)
})

loadData()

//////////////////////////////////////////

//Botão para voltar para a página principal
const backButton = document.getElementById("backButton")

backButton.addEventListener ("click", function () {
    window.location.href = "../../mentors/html/index.html"
})


//////////////////////////////////////////
//Pegar os dados do usuário no localStorage
// No JavaScript da página de mentores
document.addEventListener("DOMContentLoaded", () => {
    // Recupere a lista de usuários cadastrados do localStorage
    const usersList = JSON.parse(localStorage.getItem("usersList"));
  
    if (usersList && usersList.length > 0) {
      // Se a lista de usuários existir e não estiver vazia, exiba o último usuário cadastrado
      const lastUser = usersList[usersList.length - 1];
      document.getElementById("user-name").textContent = `${lastUser.name}`;
      document.getElementById("user-email").textContent = `${lastUser.email}`;
    } else {
      alert("Usuário não existe!")
    }
  });