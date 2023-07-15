//R = Read
const url = "http://localhost:3000/mentors";

const showMentors = (mentors) => {
  const tableContent = document.getElementById("tableContent");
  let mentorHtml = "";

  mentors.forEach((mentor) => {
    mentorHtml += `
      <tr>
        <td>${mentor.name}</td>
        <td>${mentor.email}</td>
        <td>
          <button class="edit-button" id="editButton" onclick="edit(${mentor.id})"><i class="fa-solid fa-pencil" style="color: #004ce8;"></i></button>
          <button class="delete-button" id="deleteButton" onclick="deleteButton(${mentor.id})"><i class="fa-solid fa-trash" style="color: #ff3333;"></i></button>
        </td>
      </tr>
    `;
  });

  tableContent.innerHTML = mentorHtml;
};

const getMentors = async () => {
  try {
    const apiResponse = await fetch(url);
    const mentors = await apiResponse.json();

    console.log(mentors);
    showMentors(mentors);
  } catch (error) {
    console.error(error);
  }
};

getMentors();

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
  window.location.href = "../mentorship/mentorship_index.html";
});

classesPage.addEventListener("click", function () {
  window.location.href = "../classes/classes_index.html";
});

studentsPage.addEventListener("click", function () {
  window.location.href = "../students/students_index.html";
});

//Botão "Novo Mentor"
const newButton = document.getElementById("newButton");

newButton.addEventListener("click", function () {
  window.location.href = "../../mentors/html/register.html";
});


//Botão "Editar"
// const editButton = document.getElementById("editButton");

// editButton.addEventListener("click", function () {
// });

const edit = (id) => {
    window.location.href = `../../mentors/html/edit.html?id=${id}`;    
}
//////////////////////////////////////////

//D = Delete
const deleteButton = async (mentorId) => {
    try {
      const response = await fetch(`${url}/${mentorId}`, {
        method: 'DELETE',
      })
        console.log(response);
        if (response.ok) {
          console.log('Mentor excluído com sucesso');
          // Executar ações adicionais, como atualizar a interface do usuário
        } else {
          console.error('Erro ao excluir o mentor');
        }

    } catch (error) {
      console.error('Ocorreu um erro ao excluir o mentor', error);
    }
  };