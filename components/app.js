class App {
  constructor() {
    this.container = document.getElementById("application");
  }

  run() {
    if (sessionStorage.getItem("jwt_token")) {
      //Load game
    } else {
      Login.renderLoginCard("animate__fadeInUp");
    }
  }

  setSession(token) {
    sessionStorage.setItem("jwt_token", token);
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
