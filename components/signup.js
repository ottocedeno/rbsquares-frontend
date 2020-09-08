class SignUp {
  static renderSignUpCard(animation) {
    const signUpContainer = document.createElement("div");
    signUpContainer.id = "signup";
    signUpContainer.classList.add("card", "animate__animated", animation);

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
    signUpContainer.append(signUpForm);

    APP.container.append(signUpContainer);
  }

  static renderLinkToLogin() {
    const loginElement = document.createElement("p");
    const loginLink = document.createElement("a");

    loginElement.className = "center-text";
    loginElement.innerText = "Have an account?";

    loginLink.innerText = " Login";
    loginLink.addEventListener("click", (e) => {
      e.preventDefault();
      this.removeSignUpCard();
      Login.renderLoginCard("animate__bounceInRight");
    });

    loginElement.appendChild(loginLink);

    return loginElement;
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

  static sendSignUpData() {
    fetch("http://localhost:3000/users", {
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
          console.log(obj);
          APP.setSession(obj.jwt);
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

  static removeSignUpCard() {
    const signUpContainer = document.getElementById("signup");
    signUpContainer.classList.remove("animate__fadeInUp");
    signUpContainer.classList.add("animate__bounceOutLeft");
    setTimeout(function () {
      signUpContainer.remove();
    }, 1000);
  }
}
