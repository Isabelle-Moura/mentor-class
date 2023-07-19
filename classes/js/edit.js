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
    const option = new Option(mentor.name + mentor.email, mentor.id);
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
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mentorship),
  });
  window.location = "../../classes/html/index.html"
};

const loadFormData = async (classData) => {
    loadMentorsSelect()
    loadMentorshipsSelect()
    document.getElementById("mentorship").value = mentorship.mentorship

    const mentorshipSelect = document.getElementById("mentorship")
    const mentorships = await getMentorships()

    
}
