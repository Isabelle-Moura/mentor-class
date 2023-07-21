const url = "https://api-projeto-modulo-1.onrender.com/students"

const showStudent = (students) => {
    const tableContent = document.getElementById("tableContent")
    let studentHtml = ''

    students.forEach ((student) => {
        studentHtml += `
        <tr>
          <td>${student.name}</td>
          <td>${student.email}</td>
          <td>
          <button class="edit-button" id="editButton" onclick="edit(${student.id})"><i class="fa-solid fa-pencil" style="color: #004ce8;"></i></button>
          <button class="delete-button" id="deleteButton" onclick="deleteButton(${student.id})"><i class="fa-solid fa-trash" style="color: #ff3333;"></i></button>
          </td>
        <tr>
        `
    })
    tableContent.innerHTML = studentHtml
}

const getStudent = async () => {
    try {
     const apiResponse = await fetch(url)
     const students = await apiResponse.json()
     showStudent(students)

    } catch (error) {
     console.error(error)
    }
}
getStudent()
//////////////////////////////////////////
//Imput de busca (Search Bar)
const searchInput = document.getElementById("searchInput");

const filterStudent = (students, searchTerm) => {
  searchTerm = searchTerm.toLowerCase();
  return students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm)
  );
};

const searchStudents = async (searchTerm) => {
  try {
    const apiResponse = await fetch(url);
    const students = await apiResponse.json();
    const filteredStudents = filterStudent(students, searchTerm);
    showStudent(filteredStudents);
  } catch (error) {
    console.error(error);
  }
};

searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const searchTerm = searchInput.value;
    searchStudents(searchTerm);
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

//Botão "Nova Mentoria"
const newButton = document.getElementById("newButton");

newButton.addEventListener("click", function () {
  window.location.href = "../../students/html/register.html";
});

//Botão "Editar"
const edit = (id) => {
    window.location.href = `../../students/html/edit.html?id=${id}`;    
}
//////////////////////////////////////////

//D = Delete
const deleteButton = async (studentId) => {
    try {
      const response = await fetch(`${url}/${studentId}`, {
        method: 'DELETE',
      })
        console.log(response);
        if (response.ok) {
          console.log('Aluno excluído com sucesso');
        } else {
          console.error('Erro ao excluir aluno!');
        }

    } catch (error) {
      console.error('Ocorreu um erro ao excluir o aluno!', error);
    }
  };