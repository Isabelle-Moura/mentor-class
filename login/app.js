//Icone de ocultar/mostrar senha
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("toggle-password");

togglePassword.addEventListener("click", function () {
  const passwordType = passwordInput.getAttribute("type");
  if (passwordType === "password") {
    passwordInput.setAttribute("type", "text");
    togglePassword.classList.remove("fa-eye");
    togglePassword.classList.add("fa-eye-slash");
  } else {
    passwordInput.setAttribute("type", "password");
    togglePassword.classList.remove("fa-eye-slash");
    togglePassword.classList.add("fa-eye");
  }
});

/////////////////////////////////////////////////////////
// //Validação dos inputs

const enterButton = () => {
  const email = document.querySelector("#email");
  const labelEmail = document.querySelector("#labelEmail");

  const password = document.querySelector("#password");
  const labelPassword = document.querySelector("#labelPassword");

  let msgError = document.querySelector("#msgError");
  let msgSuccess = document.querySelector("#msgSuccess")

  let usersList = null; // Inicialize como null

  let userValid = {
    name: "",
    email: "",
    password: "",
  };

  usersList = JSON.parse(localStorage.getItem("usersList"));

  if (usersList === null) {
    usersList = [];
  }
 
 usersList.forEach( (item) => {
  if (email.value == item.email && password.value == item.password){

    userValid = {
      name: item.name,
      email: item.email,
      password: item.password
    }

  }
 })

  if (email.value == userValid.email && password.value == userValid.password) {
    usersList.push(userValid); 
    localStorage.setItem("usersList", JSON.stringify(usersList));
    labelEmail.setAttribute('style', 'color: #40D175')
    email.setAttribute('style', 'border-color: #40D175')
    labelPassword.setAttribute('style', 'color: #40D175')
    password.setAttribute('style', 'border-color: #40D175')
    msgSuccess.setAttribute('style', 'display: block')
    msgError.setAttribute("style", "display: none");
    msgSuccess.innerHTML = `Redirecionando...`

    setTimeout(()=> {
      window.location.href = "../mentors/html/index.html"
    }, 3000)   

  } else {
    labelEmail.setAttribute('style', 'color: red')
    email.setAttribute('style', 'border-color: red')
    labelPassword.setAttribute('style', 'color: red')
    password.setAttribute('style', 'border-color: red')
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = `E-mail ou senha incorretos!`
    email.focus()
  }
} 