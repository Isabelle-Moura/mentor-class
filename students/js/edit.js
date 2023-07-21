//Botão para voltar para a página principal
const backButton = document.getElementById("backButton");

backButton.addEventListener("click", function () {
  window.location.href = "../../students/html/index.html";
});

/////////////////////////////////////////////////
const form = document.getElementById("formStudents");
const url = "http://localhost:3000/students";
const url2 = "http://localhost:3000/classes";
let studentId = null;

const getClass = async (id) => {
  const response = await fetch(`${url2}/${id}`);
  const className = await response.json();
  return className;
};

const getClasses = async () => {
  const response = await fetch(`${url2}`);
  const classes = await response.json();
  return classes;
};

const loadSelect = async () => {
  const classes = await getClasses();
  const classSelect = document.getElementById("className");

  const emptyOption = new Option("Selecione uma turma...", null);
  classSelect.options.add(emptyOption);

  classes.forEach((className) => {
    const option = new Option(className.className, className.id);
    classSelect.options.add(option);
  });
};

const getStudentIdUrl = () => {
  const paramsString = window.location.search;
  const params = new URLSearchParams(paramsString);
  studentId = params.get("id");
};

const getStudent = async () => {
  const apiResponse = await fetch(`${url}/${studentId}`);
  const student = await apiResponse.json();
  return student;
};

const editStudent = async (student) => {
  await fetch(`${url}/${studentId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });
  window.location = "../../students/html/index.html";
};

const loadFormData = async (student) => {
    loadSelect();
    document.getElementById("name").value = student.name;
    document.getElementById("email").value = student.email;
  
    const classSelect = document.getElementById("className");
    const className = await getClasses(); 
    const classIndex = className.findIndex(
      (classData) => classData.id === student.className.id 
    );
  
    if (classIndex !== -1) {
      classSelect.options[classIndex + 1].selected = true;
    }
  };
  

const loadData = async () => {
  getStudentIdUrl();
  const student = await getStudent();
  loadFormData(student);
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = form.elements["name"].value;
  const email = form.elements["email"].value;
  const className = form.elements["className"].value;

  const classObject = await getClass(className);
  if (Object.keys(classObject).length == 0) {
    console.log("Não foi possível cadastrar o aluno, turma inválida :/");
    return;
  }

  const student = {
    name,
    email,
    className: {
      id: classObject.id,
      name: classObject.className,
    },
  };
  editStudent(student);
});
loadData();
