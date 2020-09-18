class App {
  constructor() {
    this.container = document.getElementById("application");
  }

  run() {
    if (sessionStorage.getItem("jwt_token")) {
      this.retrieveUser();
      setTimeout(() => GameLayout.renderLayout(), 800);
    } else {
      this.createWelcomeContainer();
      Login.renderLogin("animate__fadeInUp");
    }
  }

  loadGame(userObj) {
    APP.setUser(userObj);
    APP.setSession(userObj.jwt);
    // APP.renderGameLayout(userObj);
    GameLayout.renderLayout();
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
        this.setUser(userObj);
      });
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
