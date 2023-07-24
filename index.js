// Icone de ocultar/mostrar senha
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const togglePassword = document.getElementById("toggle-password");
const toggleConfirmPassword = document.getElementById(
  "toggle-confirm-password"
);

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

toggleConfirmPassword.addEventListener("click", function () {
  const confirmPasswordType = confirmPasswordInput.getAttribute("type");
  if (confirmPasswordType === "password") {
    confirmPasswordInput.setAttribute("type", "text");
    toggleConfirmPassword.classList.remove("fa-eye");
    toggleConfirmPassword.classList.add("fa-eye-slash");
  } else {
    confirmPasswordInput.setAttribute("type", "password");
    toggleConfirmPassword.classList.remove("fa-eye-slash");
    toggleConfirmPassword.classList.add("fa-eye");
  }
});
////////////////////////////////
const userName = document.querySelector("#userName");
const labelName = document.querySelector("#labelName");
let validName = false;

const email = document.querySelector("#email");
const labelEmail = document.querySelector("#labelEmail");
let validEmail = false;

const password = document.querySelector("#password");
const labelPassword = document.querySelector("#labelPassword");
let validPassword = false;

const confirmPassword = document.querySelector("#confirmPassword");
const labelConfirmPassword = document.querySelector("#labelConfirmPassword");
let validConfirmPassword = false;

let msgError = document.querySelector("#msgError");
let msgSuccess = document.querySelector("#msgSuccess");

userName.addEventListener("keyup", () => {
  if (userName.value.length <= 2) {
    labelName.setAttribute("style", "color: red");
    labelName.innerHTML = `Nome <small>(Insira no mínimo 3 caracteres.)</small>`;
    userName.setAttribute("style", "border-color: red");
    validName = false;
  } else {
    labelName.setAttribute("style", "color: #40D175");
    labelName.innerHTML = `Nome`;
    userName.setAttribute("style", "border-color: #40D175");
    validName = true;
  }
});

email.addEventListener("keyup", () => {
  if (email.value.length <= 4) {
    labelEmail.setAttribute("style", "color: red");
    labelEmail.innerHTML = `Email <small>(Insira no mínimo 5 caracteres.)</small>`;
    email.setAttribute("style", "border-color: red");
    validEmail = false;
  } else {
    labelEmail.setAttribute("style", "color: #40D175");
    labelEmail.innerHTML = `Email`;
    email.setAttribute("style", "border-color: #40D175");
    validEmail = true;
  }
});

password.addEventListener("keyup", () => {
  if (password.value.length <= 5) {
    labelPassword.setAttribute("style", "color: red");
    labelPassword.innerHTML = `Senha <small>(Insira no mínimo 6 caracteres.)</small>`;
    password.setAttribute("style", "border-color: red");
    validPassword = false;
  } else {
    labelPassword.setAttribute("style", "color: #40D175");
    labelPassword.innerHTML = `Senha`;
    password.setAttribute("style", "border-color: #40D175");
    validPassword = true;
  }
});

confirmPassword.addEventListener("keyup", () => {
  if (password.value != confirmPassword.value) {
    labelConfirmPassword.setAttribute("style", "color: red");
    labelConfirmPassword.innerHTML = `Confirmar senha <small>(As senhas não estão iguais!)</small>`;
    confirmPassword.setAttribute("style", "border-color: red");
    validConfirmPassword = false;
  } else {
    labelConfirmPassword.setAttribute("style", "color: #40D175");
    labelConfirmPassword.innerHTML = `Confirmar senha`;
    confirmPassword.setAttribute("style", "border-color: #40D175");
    validConfirmPassword = true;
  }
});

const signupButton = () => {
  if (validName && validEmail && validName && validConfirmPassword) {
    let usersList = JSON.parse(localStorage.getItem("usersList") || "[]");

    usersList.push({
      name: userName.value,
      email: email.value,
      password: password.value,
    });
    localStorage.setItem("usersList", JSON.stringify(usersList));

    msgSuccess.setAttribute("style", "display: block");
    msgError.setAttribute("style", "display: none");
    msgSuccess.innerHTML = `<strong>Cadastrando usuário...</strong>`;

    setTimeout(() => {
      window.location.href = "./login/index.html";
    }, 3000);
  } else {
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML = `<strong>Erro ao cadastrar usuário!</strong>`;
    msgSuccess.setAttribute("style", "display: none");
  }
};
