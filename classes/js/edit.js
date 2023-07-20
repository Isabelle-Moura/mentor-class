const formClasses = document.getElementById("formClasses");
const url = "http://localhost:3000/classes";
const url1 = "http://localhost:3000/mentorships";
const url2 = "http://localhost:3000/mentors";
let classId = null;

const getMentorship = async (id) => {
  if (id == null) {
    return false;
  }
  const response = await fetch(`${url1}/${id}`);
  const mentorship = await response.json();
  return mentorship;
};

const getMentorships = async () => {
  const response = await fetch(`${url1}`);
  const mentorships = await response.json();
  return mentorships;
};

const loadMentorshipsSelect = async () => {
  const mentorships = await getMentorships();
  const mentorshipSelect = document.getElementById("mentorship");

  const emptyOption = new Option("Selecione uma mentoria...", null);
  mentorshipSelect.options.add(emptyOption);

  mentorships.forEach((mentorship) => {
    const option = new Option(mentorship.mentorshipTitle, mentorship.id);
    mentorshipSelect.options.add(option);
  });
  console.log(mentorshipSelect);
};

const getMentor = async (id) => {
  if (id == null) {
    return false;
  }
  const response = await fetch(`${url2}/${id}`);
  const mentor = await response.json();
  return mentor;
};

const getMentors = async () => {
  const response = await fetch(`${url2}`);
  const mentors = await response.json();
  return mentors;
};

const loadMentorsSelect = async () => {
  const mentors = await getMentors();
  const mentorSelect = document.getElementById("mentorName");

  const emptyOption = new Option("Selecione um mentor...", null);
  mentorSelect.options.add(emptyOption);

  mentors.forEach((mentor) => {
    const option = new Option(
      mentor.name + " " + "(" + mentor.email + ")",
      mentor.id
    );
    mentorSelect.options.add(option);
  });
  console.log(mentorSelect);
};

const getClassIdUrl = () => {
  const paramsString = window.location.search;
  const params = new URLSearchParams(paramsString);
  classId = params.get("id");
};

const getClass = async () => {
  const apiResponse = await fetch(`${url}/${classId}`);
  const classData = await apiResponse.json();
  return classData;
};

const editClass = async (classData) => {
  await fetch(`${url}/${classId}`, {
    method: "PUT",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(classData),
  });
  window.location = "../../classes/html/index.html";
};

const loadFormData = async (classData) => {
  loadMentorsSelect();
  loadMentorshipsSelect();
  
  document.getElementById("className").value = classData.className;
  document.getElementById("mentorship").value = classData.mentorship.id;
  document.getElementById("mentorName").value = classData.mentorName.id;
  document.getElementById("beginning").value = classData.beginning;
  document.getElementById("weekday").value = classData.weekday;
  document.getElementById("beginningTime").value = classData.beginningTime;
  document.getElementById("classLink").value = classData.classLink;
  document.getElementById("endingTime").value = classData.endingTime;
  document.getElementById("meetQuantity").value = classData.meetQuantity;

  const mentorSelect = document.getElementById("mentorName");
  const mentors = await getMentors();
  for (let counter = 1; counter <= mentors.length; counter++) {
    if (
      mentorSelect.options[counter].innerText === mentors.mentorName.name
      ) {
        console.log(mentors)
        mentorSelect.options[counter].selected = true;
    }
  }

  const mentorshipSelect = document.getElementById("mentorship");
  const mentorships = await getMentorships();
  for (let counter = 1; counter <= mentorships.length; counter++) {
    if (
      mentorshipSelect.options[counter].innerText ===
      classData.mentorship.mentorship
    ) {
      mentorshipSelect.options[counter].selected = true;
      break;
    }
  }
};

const loadData = async () => {
  getClassIdUrl();
  const classData = await getClass();
  loadFormData(classData);
};

formClasses.addEventListener("submit", async (e) => {
  e.preventDefault();
  const mentorship = formClasses.elements["mentorship"].value;
  const mentorName = formClasses.elements["mentorName"].value;
  const beginning = formClasses.elements["beginning"].value;
  const weekday = formClasses.elements["weekday"].value;
  const beginningTime = formClasses.elements["beginningTime"].value;
  const endingTime = formClasses.elements["endingTime"].value;
  const className = formClasses.elements["className"].value;
  const classLink = formClasses.elements["classLink"].value;
  const meetQuantity = formClasses.elements["meetQuantity"].value;

  const mentorshipObject = await getMentorship(mentorship);
  if (Object.keys(mentorshipObject).lenght == 0) {
    console.log("Não foi possível cadastrar a turma, mentoria inválida :/");
  }

  const mentorObject = await getMentor(mentorName);
  if (Object.keys(mentorObject).lenght == 0) {
    console.log("Não foi possível cadastrar a turma, mentor inválido :/");
  }

  const classData = {
    mentorName: {
      id: mentorObject.id,
      name: mentorObject.name,
    },
    mentorship: {
      id: mentorshipObject.id,
      mentorship: mentorshipObject.mentorshipTitle,
    },
    beginning,
    weekday,
    beginningTime,
    endingTime,
    className,
    classLink,
    meetQuantity,
  };
  editClass(classData);
});
loadData();
//////////////////////////////////////////

//Botão para voltar para a página principal
const backButton = document.getElementById("backButton");

backButton.addEventListener("click", function () {
  window.location.href = "../../classes/html/index.html";
});
