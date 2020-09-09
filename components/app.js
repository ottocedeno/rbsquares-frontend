class App {
  constructor() {
    this.container = document.getElementById("application");
  }

  run() {
    if (sessionStorage.getItem("jwt_token")) {
      //Load game
      loadGame();
    } else {
      Login.renderLoginCard("animate__fadeInUp");
    }
  }

  setSession(token) {
    sessionStorage.setItem("jwt_token", token);
  }

  loadGame(userObj) {
    //save token
    this.setSession(userObj.jwt);

    //save user

    //clearDOM
    this.clearDOM();
    this.container.innerHTML = "<p>Loading the Game</p>";
    //Load nav
    //Load Game
  }

  clearSession() {
    sessionStorage.clear();
  }

  clearDOM() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }
}
