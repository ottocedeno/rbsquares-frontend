class SignUp {
  static renderSignUp(animation) {
    const layoutContainer = document.getElementById("welcome-container");

    const signUpCard = document.createElement("div");
    signUpCard.id = "signup";
    signUpCard.classList.add("card", "animate__animated", animation);

    const signUpForm = document.createElement("form");
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
    submitBtn.innerText = "SIGNUP";
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.sendSignUpData();
    });

    signUpForm.append(
      inputUsername,
      inputPassword,
      submitBtn,
      this.renderLinkToLogin()
    );

    signUpCard.append(signUpForm);
    layoutContainer.append(signUpCard);
  }

  static renderLinkToLogin() {
    const loginElement = document.createElement("p");
    const loginLink = document.createElement("a");

    loginElement.className = "center-text";
    loginElement.innerText = "Have an account?";

    loginLink.innerText = " Login";
    loginLink.addEventListener("click", (e) => {
      e.preventDefault();
      this.removeSignUp();
      setTimeout(function () {
        Login.renderLogin("animate__bounceInRight");
      }, 400);
    });

    loginElement.appendChild(loginLink);

    return loginElement;
  }

  static sendSignUpData() {
    fetch("http://localhost:3000/users", {
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
          APP.loadGame(userObj);
        } else {
          Utility.renderError(userObj.message);
        }
      });
  }

  static removeSignUp() {
    const signUpCard = document.getElementById("signup");
    signUpCard.classList.remove("animate__fadeInUp");
    signUpCard.classList.add("animate__bounceOutLeft");
    setTimeout(function () {
      signUpCard.remove();
    }, 400);
  }
}
