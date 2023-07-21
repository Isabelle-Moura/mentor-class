//Botão para voltar para a página principal
const backButton = document.getElementById("backButton");

backButton.addEventListener("click", function () {
  window.location.href = "../../mentorship/html/index.html";
});

/////////////////////////////////////////////////

//C = Create
const form = document.getElementById("formMentorship");
const url1 = "http://localhost:3000/mentorships";
const url2 = "http://localhost:3000/mentors"

const getMentor = async (id) => {
    const response = await fetch (`${url2}/${id}`)
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

const registerMentorship = async (mentorship) => {
  try {
    await fetch(`${url1}`, {
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

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const mentorshipTitle = form.elements['mentorshipTitle'].value;
  const mentor = form.elements['mentor'].value;
  const status = form.elements['toggle-input'].checked;

  const mentorObject = await getMentor(mentor)
  if(Object.keys(mentorObject).length == 0){
    console.log("Não foi possível cadastrar a mentoria, mentor inválido :/")
    return
  }

  const mentorship = {
    mentorshipTitle: mentorshipTitle,
    mentor: {
      id: mentorObject.id,
      name: mentorObject.name
    },
    status: status
  };

  registerMentorship(mentorship);
});
loadSelect()
//////////////////////////////////////////