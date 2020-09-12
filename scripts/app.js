class App {
  constructor() {
    this.container = document.getElementById("application");
  }

  run() {
    if (sessionStorage.getItem("jwt_token")) {
      this.retrieveUser();
      setTimeout(() => this.renderGameLayout(), 1000);
    } else {
      this.createWelcomeContainer();
      Login.renderLogin("animate__fadeInUp");
    }
  }

  renderGameLayout() {
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

  retrieveUser() {
    fetch("http://localhost:3000/retrieve", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt_token")}`,
      },
    })
      .then((resp) => resp.json())
      .then((userObj) => {
        console.log("response from server:");
        console.log(userObj);
        this.setUser(userObj);
      });
  }

  setUser(userObj) {
    const { username, balance, winstreak } = userObj.user.data.attributes;
    USER = new User(username, balance, winstreak);
    console.log(USER);
  }

  clearDOM() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }
}
