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
//Validação dos inputs
const form = document.getElementById("form");
const REQUIRED = "Este campo é obrigatório!";

const showMessage = (input, message, className) => {
  const msg = input.parentNode.querySelector("small");
  msg.innerText = message;
  input.classList.remove("success");
  input.classList.remove("error");
  input.classList.add(className);
  return className === "success";
};

const hasValue = (input, message) => {
  if (input.value.trim() === "") {
    return showMessage(input, message, "error");
  } else {
    return showMessage(input, "", "success");
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = form.elements["name"];
  const email = form.elements["email"];
  const password = form.elements["password"];
  const button = document.getElementById("enterButton")

  const nameValid = hasValue(name, REQUIRED);
  const emailValid = hasValue(email, REQUIRED);
  const passwordValid = hasValue(password, REQUIRED);

  if (nameValid && emailValid && passwordValid) {
    button.disabled = false
    button.classList.remove('disabled')
    if (button.disabled != true)
    window.location.href = "../mentors/html/index.html";
  }
});

// const enterButton = () => {
//   }

/////////////////////////////////////////////////////////
