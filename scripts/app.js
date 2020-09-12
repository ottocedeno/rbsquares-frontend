class App {
  constructor() {
    this.container = document.getElementById("application");
  }

  run() {
    if (sessionStorage.getItem("jwt_token")) {
      //Load game
      // this.loadGame();
    } else {
      this.createWelcomeContainer();
      Login.renderLogin("animate__fadeInUp");
    }
  }

  renderGameLayout(userObj) {
    //save token
    // this.setSession(userObj.jwt);

    //save user
    this.setUser(userObj);

    this.clearDOM();
    APP.container.classList.remove("flex-center");
    Nav.renderNav();

    //Load Game
  }

  createWelcomeContainer() {
    const welcomeContainer = document.createElement("div");
    welcomeContainer.id = "welcome-container";

    this.container.appendChild(welcomeContainer);
  }
  setSession(token) {
    sessionStorage.setItem("jwt_token", token);
  }

  clearSession() {
    sessionStorage.clear();
  }

  setUser(userObj) {
    const { username, balance, winstreak } = userObj.user.data.attributes;
    USER = new User(username, balance, winstreak);
  }

  clearDOM() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }
}
