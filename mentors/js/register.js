//Botão para voltar para a página principal
const backButton = document.getElementById("backButton");

backButton.addEventListener("click", function () {
  window.location.href = "../../mentors/html/index.html";
});

//C = Create
const form = document.getElementById("form");
const url = "http://localhost:3000/mentors";

const registerMentor = async (mentor) => {
  try {
    await fetch(`${url}`, {
      method: "POST",
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mentor),
    });
    window.location = "../../mentors/html/index.html";

  } catch (error) {
    console.error(error);
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = form.elements['name'].value;
  const email = form.elements['email'].value;

  const mentor = {
    "name": name,
    "email": email,
  };

  registerMentor(mentor);
});

//////////////////////////////////////////