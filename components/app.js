class App {
  constructor() {
    this.container = document.getElementById("application");
  }

  run() {
    if (sessionStorage.getItem("jwt_token")) {
      //Load game
      // this.loadGame();
    } else {
      Login.renderLoginCard("animate__fadeInUp");
    }
  }

  loadGame(userObj) {
    //save token
    // this.setSession(userObj.jwt);

    //save user
    this.setUser(userObj);

    //clearDOM
    this.clearDOM();
    this.container.innerHTML = "<p>Loading the Game</p>";
    //Load nav
    //Load Game
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
