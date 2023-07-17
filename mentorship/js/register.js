//Configurações do toggle de Ativo/Inativo

const toggleInput = document.getElementById('toggle-input');

toggleInput.addEventListener('change', () => {
  // Se o toggle estiver ativo, fazer alguma ação
  if (toggleInput.checked) {
    console.log('Toggle ativado :D');
  } else {
    console.log('Toggle desativado :C');
  }
});

//Redirecionamento das páginas

//"Side Menu"
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

//Botão para voltar para a página principal
const backButton = document.getElementById("backButton");

backButton.addEventListener("click", function () {
  window.location.href = "../../mentors/html/index.html";
});

/////////////////////////////////////////////////

//C = Create
const form = document.getElementById("form");
const url1 = "http://localhost:3000/mentorships";
const url2 = "http://localhost:3000/mentors"

const getMentor = async (id) => {
    if (id == null){
        return false
    }
    const response = await fetch (`${url2}`/${id})
    const mentor = await response.json()
    return mentor
}

const getMentors = async () => {
    const response = await fetch (`${url2}`)
    const mentors = await response.json()
    return mentors
}

const loadSelect = async () => {
    const mentors = await getMentors()
    const mentorSelect = document.getElementById("mentor")

    const emptyOption = new Option ('Selecione um mentor...', null)
    mentorSelect.options.add(emptyOption)
    
    mentors.forEach ( mentor => {
        const option = new Option (mentor.name, mentor.id)
        mentorSelect.options.add(option)
    })
}

//Parei aqui

const registerMentorship = async (mentorship) => {
  try {
    await fetch(`${url}`, {
      method: "POST",
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mentorship),
    });
    window.location = "../../mentorship/html/index.html";

  } catch (error) {
    console.error(error);
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const mentorshipTitle = form.elements['mentorshipTitle'].value;
  const mentor = form.elements['email'].value;
  const status = form.elements['status'].value;

  const mentorship = {
    "mentorshipTitle": mentorshipTitle,
    "mentor"
  };

  registerMentorship(mentorship);
});

//////////////////////////////////////////