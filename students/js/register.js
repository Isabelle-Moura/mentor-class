//Botão para voltar para a página principal
const backButton = document.getElementById("backButton");

backButton.addEventListener("click", function () {
  window.location.href = "../../students/html/index.html";
});

/////////////////////////////////////////////////
const form = document.getElementById("formStudents")
const url = "https://api-projeto-modulo-1.onrender.com/students"
const url2 = "https://api-projeto-modulo-1.onrender.com/classes"

const getClass = async (id) => {
    const response = await fetch (`${url2}/${id}`)
    const className = await response.json()
    return className
}

const getClasses = async () => {
    const response  = await fetch (`${url2}`)
    const classes = await response.json()
    return classes
}

const loadSelect = async () => {
    const classes = await getClasses()
    const classSelect = document.getElementById("className")

    const emptyOption = new Option ('Selecione uma turma...', null)
    classSelect.options.add(emptyOption)

    classes.forEach ( className => {
        const option = new Option (className.className, className.id)
        classSelect.options.add(option)
    })
}

const registerStudent = async (student) => {
    try {
      await fetch (`${url}`, {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });
    window.location = "../../students/html/index.html";

    } catch (error) {
        console.error(error);
      }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const name = form.elements["name"].value
    const email = form.elements["email"].value
    const className = form.elements["className"].value

    const classObject = await getClass(className)
    if(Object.keys(classObject).length == 0){
        console.log("Não foi possível cadastrar o aluno, turma inválida :/")
        return
    }

    const student = {
        name,
        email,
        className: {
            id: classObject.id,
            name: classObject.className
        }
    }
    registerStudent(student)
})
loadSelect()