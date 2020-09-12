class Login {
  static renderLogin(animation) {
    const welcomeContainer = document.getElementById("welcome-container");

    const loginCard = document.createElement("div");
    loginCard.id = "login";
    loginCard.classList.add("card", "animate__animated", animation);

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
      this.sendLoginData();
    });

    loginForm.append(
      inputUsername,
      inputPassword,
      submitBtn,
      this.renderLinkToSignup()
    );

    loginCard.append(loginForm);
    welcomeContainer.append(loginCard);
  }

  static renderLinkToSignup() {
    const signUpElement = document.createElement("p");
    const signUpLink = document.createElement("a");

    signUpElement.className = "center-text";
    signUpElement.innerText = "First time playing?";

    signUpLink.innerText = " Sign Up";
    signUpLink.addEventListener("click", (e) => {
      e.preventDefault();
      this.removeLogin();
      setTimeout(function () {
        SignUp.renderSignUp("animate__bounceInRight");
      }, 400);
    });

    signUpElement.appendChild(signUpLink);

    return signUpElement;
  }

  static sendLoginData() {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: Form.UserCredentials(),
      }),
    })
      .then((resp) => resp.json())
      .then((userObj) => {
        if (userObj.user) {
          APP.renderGameLayout(userObj);
        } else {
          Utility.renderError(userObj.message);
        }
      });
  }

  static renderError(error) {
    alert(error["message"]);
  }

  static removeLogin() {
    const loginCard = document.getElementById("login");
    loginCard.classList.remove("animate__fadeInUp");
    loginCard.classList.add("animate__bounceOutLeft");
    setTimeout(function () {
      loginCard.remove();
    }, 400);
  }
}
