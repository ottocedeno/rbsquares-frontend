class App {
  constructor() {
    this.container = document.getElementById("application");
  }

  run() {
    if (sessionStorage.getItem("jwt_token")) {
      this.renderGameLayout();
    } else {
      this.createWelcomeContainer();
      Login.renderLogin("animate__fadeInUp");
    }
  }

  renderGameLayout(user) {
    this.setSession(user.jwt);
    this.setUser(user);

    this.clearDOM();
    APP.container.classList.remove("flex-center");

    Nav.renderNav();
    Game.renderBoard();
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
