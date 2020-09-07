class App {
  constructor() {
    this.container = document.getElementById("application");
  }

  run() {
    if (sessionStorage.getItem("jwt")) {
      //Load game
    } else {
      Login.renderLoginCard("animate__fadeInUp");
    }
  }

  clearDOM() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }
}

class Login {
  static renderLoginCard(animation) {
    const loginContainer = document.createElement("div");
    loginContainer.id = "login";
    loginContainer.classList.add("card", "animate__animated", animation);

    const loginForm = document.createElement("form");
    const inputUsername = document.createElement("input");
    const inputPassword = document.createElement("input");
    const submitBtn = document.createElement("button");

    inputUsername.id = "username";
    inputUsername.type = "text";
    inputUsername.placeholder = "username";

    inputPassword.id = "password";
    inputPassword.type = "password";
    inputPassword.placeholder = "password";

    submitBtn.className = "btn-primary";
    submitBtn.innerText = "LOGIN";
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Login Button works");
      this.sendLoginData();
    });

    loginForm.append(
      inputUsername,
      inputPassword,
      submitBtn,
      this.renderLinkToSignup()
    );
    loginContainer.append(loginForm);

    APP.container.append(loginContainer);
  }

  static renderLinkToSignup() {
    const signUpElement = document.createElement("p");
    const signUpLink = document.createElement("a");

    signUpElement.className = "center-text";
    signUpElement.innerText = "Don't have an account?";

    signUpLink.innerText = " Sign Up";
    signUpLink.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("load the sign up page");
    });

    signUpElement.appendChild(signUpLink);

    return signUpElement;
  }

  static formData() {
    const userName = document.getElementById("username");
    const password = document.getElementById("password");

    const user = {
      username: userName.value,
      password: password.value,
    };

    return user;
  }

  static sendLoginData() {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: this.formData(),
      }),
    })
      .then((r) => r.json())
      .then((obj) => {
        if (obj.user) {
          console.log("Found a user");
          APP.clearDOM();
          APP.container.innerHTML = "<p>Loading the Game</p>";
        } else {
          this.renderError(obj);
        }
      });
  }

  static renderError(error) {
    alert(error["message"]);
  }

  static removeLoginCard() {
    const loginContainer = document.getElementById("login");
    loginContainer.remove();
  }
}

const APP = new App();
APP.run();
