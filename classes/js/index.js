const url = "http://localhost:3000/classes";

const showClasses = (classes) => {
    const tableContent = document.getElementById("tableContent");
    let classHtml = "";
  
    classes.forEach((classData) => {
      classHtml += `
        <tr>
          <td>${classData.className}</td>
          <td>${classData.mentorName.name}</td>
          <td style="max-width: 120px;">${classData.mentorship.mentorship}</td>
          <td>${classData.beginning}</td>
          <td>${classData.weekday}</td>
          <td>${classData.beginningTime + '-' + classData.endingTime}</td>
          <td>${classData.meetQuantity}</td>
          <td>
            <button class="edit-button" id="editButton" onclick="edit(${classData.id})"><i class="fa-solid fa-pencil" style="color: #004ce8;"></i></button>
            <button class="delete-button" id="deleteButton" onclick="deleteButton(${classData.id})"><i class="fa-solid fa-trash" style="color: #ff3333;"></i></button>
          </td>
        </tr>
      `;
    });
  
    tableContent.innerHTML = classHtml;
  };
  
const getClasses = async () => {
    try {
      const apiResponse = await fetch(url);
      const classes = await apiResponse.json();
  
      console.log(classes);
      showClasses(classes);
    } catch (error) {
      console.error(error);
    }
  };
  
  getClasses();
//////////////////////////////////////////

//Imput de busca (Search Bar) 

const searchInput = document.getElementById("searchInput");

const filterClasses = (classes, searchTerm) => {
  searchTerm = searchTerm.toLowerCase();
  return classes.filter((classData) => {
    const mentorName = classData.mentorName.name.toLowerCase();
    const className = classData.className.toLowerCase();
    return mentorName.includes(searchTerm) || className.includes(searchTerm); //Vai pesquisar tanto por turma quanto por mentor
  });
};

const searchClasses = async (searchTerm) => {
  try {
    const apiResponse = await fetch(`${url}`);
    const classes = await apiResponse.json();
    const filteredClasses = filterClasses(classes, searchTerm);
    showClasses(filteredClasses);
  } catch (error) {
    console.error(error);
  }
};

searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const searchTerm = searchInput.value;
    searchClasses(searchTerm);
  }
});


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

//Botão "Novo Mentor"
const newButton = document.getElementById("newButton");

newButton.addEventListener("click", function () {
  window.location.href = "../../classes/html/register.html";
});

//Botão "Editar"
const edit = (id) => {
    window.location.href = `../../classes/html/edit.html?id=${id}`;    
}
//////////////////////////////////////////

//D = Delete
const deleteButton = async (classId) => {
    try {
      const response = await fetch(`${url}/${classId}`, {
        method: 'DELETE',
      })
        console.log(response);
        if (response.ok) {
          console.log('Turma excluída com sucesso');
        } else {
          console.error('Erro ao excluir a turma!');
        }

    } catch (error) {
      console.error('Ocorreu um erro ao excluir a turma!', error);
    }
  };