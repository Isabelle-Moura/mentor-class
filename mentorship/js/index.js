//R = Read
const url = "http://localhost:3000/mentorships";

const showMentorship = (mentorships) => {
  const tableContent = document.getElementById("tableContent");
  let mentorshipHtml = "";

  mentorships.forEach((mentorhip) => {
    mentorshipHtml += `
      <tr>
        <td>${mentorship.title}</td>
        <td>${mentorship.mentor}</td>
        <td>${mentorship.status}</td>
        <td>
          <button class="edit-button" id="editButton" onclick="edit(${mentorship.id})"><i class="fa-solid fa-pencil" style="color: #004ce8;"></i></button>
          <button class="delete-button" id="deleteButton" onclick="deleteButton(${mentorship.id})"><i class="fa-solid fa-trash" style="color: #ff3333;"></i></button>
        </td>
      </tr>
    `;
  });

  tableContent.innerHTML = mentorshipHtml;
};

const getMentorship = async () => {
  try {
    const apiResponse = await fetch(url);
    const mentorships = await apiResponse.json();

    console.log(mentorship);
    showMentorship(mentorships);
  } catch (error) {
    console.error(error);
  }
};

getMentorship();

//////////////////////////////////////////

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

//Botão "Nova Mentoria"
const newButton = document.getElementById("newButton");

newButton.addEventListener("click", function () {
  window.location.href = "../../mentorship/html/register.html";
});

//Botão "Editar"
const edit = (id) => {
    window.location.href = `../../mentors/html/edit.html?id=${id}`;    
}
//////////////////////////////////////////

//D = Delete
const deleteButton = async (mentorshipId) => {
    try {
      const response = await fetch(`${url}/${mentorshipId}`, {
        method: 'DELETE',
      })
        console.log(response);
        if (response.ok) {
          console.log('Mentoria excluída com sucesso');
        } else {
          console.error('Erro ao excluir a mentorria!');
        }

    } catch (error) {
      console.error('Ocorreu um erro ao excluir a mentoria!', error);
    }
  };