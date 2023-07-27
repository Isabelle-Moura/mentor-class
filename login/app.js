// Icon to hide/show password
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("toggle-password");

// Event listener to toggle password visibility
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

const enterButton = () => {
  const email = document.querySelector("#email");
  const labelEmail = document.querySelector("#labelEmail");

  const password = document.querySelector("#password");
  const labelPassword = document.querySelector("#labelPassword");

  let msgError = document.querySelector("#msgError");
  let msgSuccess = document.querySelector("#msgSuccess");

  let usersList = null; // Initialize as null

  let userValid = {
    name: "",
    email: "",
    password: "",
  };

  usersList = JSON.parse(localStorage.getItem("usersList"));

  // If localStorage doesn't have any data for "usersList," initialize an empty array
  if (usersList === null) {
    usersList = [];
  }

  // Check if the email and password fields are empty
  if (email.value === "" || password.value === "") {
    // Show error message and stop the function execution
    labelEmail.setAttribute("style", "color: red");
    email.setAttribute("style", "border-color: red");
    labelPassword.setAttribute("style", "color: red");
    password.setAttribute("style", "border-color: red");
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML = `Os campos não foram preenchidos!`;
    email.focus();
    return; // Stop the function execution
  }

  // Check if the entered email and password match any user in the usersList
  usersList.forEach((item) => {
    if (email.value == item.email && password.value == item.password) {
      userValid = {
        name: item.name,
        email: item.email,
        password: item.password,
      };
    }
  });

  // If the entered email and password are valid, store userValid in localStorage
  if (email.value == userValid.email && password.value == userValid.password) {
    usersList.push(userValid);
    localStorage.setItem("usersList", JSON.stringify(usersList));

    // Update UI to indicate success and redirect to a new page
    labelEmail.setAttribute("style", "color: #40D175");
    email.setAttribute("style", "border-color: #40D175");
    labelPassword.setAttribute("style", "color: #40D175");
    password.setAttribute("style", "border-color: #40D175");
    msgSuccess.setAttribute("style", "display: block");
    msgError.setAttribute("style", "display: none");
    msgSuccess.innerHTML = `Redirecionando...`;

    setTimeout(() => {
      window.location.href = "../mentors/html/index.html";
    }, 3000);
  } else {
    // If the entered email or password is incorrect, show an error message
    labelEmail.setAttribute("style", "color: red");
    email.setAttribute("style", "border-color: red");
    labelPassword.setAttribute("style", "color: red");
    password.setAttribute("style", "border-color: red");
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML = `E-mail ou senha incorretos!`;
    email.focus();
  }
};
