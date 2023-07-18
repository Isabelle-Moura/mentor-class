//U = UPDATE
const formMentorship = document.getElementById("formMentorship");
let mentorshipId = null;
const url = "http://localhost:3000/mentorships";
const url2 = "http://localhost:3000/mentors"

const getMentor = async (id) => {
    if (id == null){
        return false
    }
    const response = await fetch (`${url2}/${id}`)
    const mentor = await response.json()
    return mentor
}

const getMentors = async () => {
    const response = await fetch (`${url2}`)
    const mentors = await response.json()
    return mentors
}

const loadSelect = async (id) => {
    const mentors = await getMentors()
    const mentorSelect = document.getElementById("mentor")

    const emptyOption = new Option ('Selecione um mentor...', null)
    mentorSelect.options.add(emptyOption)
    
    mentors.forEach ( mentor => {
        const option = new Option (mentor.name, mentor.id)
        mentorSelect.options.add(option)
    })
}

const getMentorshipIdUrl = () => {
  const paramsString = window.location.search;
  const params = new URLSearchParams(paramsString);
  mentorshipId = params.get("id");
};

const getMentorship = async () => {
  const apiResponse = await fetch(`${url}/${mentorshipId}`);
  const mentorship = await apiResponse.json();

  return mentorship;
};

//UPDATE
const editMentorship = async (mentorship) => {
  await fetch(`${url}/${mentorshipId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mentorship),
  });
  window.location = "../../mentorship/html/index.html";
};

const loadFormData = async (mentorship) => {
  loadSelect()
  document.getElementById("mentorshipTitle").value = mentorship.mentorshipTitle;
  document.getElementById("toggle-input").checked = mentorship.status;
  const select = document.getElementById('mentor')
  const mentors = await getMentors()

  for (let counter = 1; counter <= mentors.length; counter++) {
    if (select.options[counter].innerText === mentorship.mentor.name) {
      select.options[counter].selected = true;
    }
  }
};

const loadData = async () => {
  getMentorshipIdUrl();
  const mentorship = await getMentorship();
  loadFormData(mentorship);
};

formMentorship.addEventListener("submit", async (e) => {
  e.preventDefault();

  const mentorshipTitle = formMentorship.elements["mentorshipTitle"].value;
  const mentor = formMentorship.elements["mentor"].value;
  const status = formMentorship.elements["toggle-input"].checked;

  const mentorObject = await getMentor(mentor);

  if (Object.keys(mentorObject).length == 0) {
    console.log("Não foi possível cadastrar a mentoria, mentor inválido :/");
    return;
  }

  const mentorship = {
    mentorshipTitle: mentorshipTitle,
    mentor: {
      id: mentorObject.id,
      name: mentorObject.name,
    },
    status: status,
  };

  editMentorship(mentorship);
});

loadData();

//////////////////////////////////////////

//Redirecionamento das páginas

//Botão para voltar para a página principal
const backButton = document.getElementById("backButton");

backButton.addEventListener("click", function () {
  window.location.href = "../../mentorship/html/index.html";
});

//"Side Menu"
const mentorsPage = document.getElementById("mentorsPage");
const mentorshipPage = document.getElementById("mentorshipPage");
const classesPage = document.getElementById("classesPage");
const studentsPage = document.getElementById("studentsPage");

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
//////////////////////////////////////////
