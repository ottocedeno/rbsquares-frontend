class Nav {
  static renderNav() {
    const header = document.createElement("header");
    header.classList.add("animate__animated", "animate__fadeInDown");
    const nav = document.createElement("nav");

    const userInfo = document.createElement("ul");
    const username = document.createElement("li");
    const balance = document.createElement("li");
    username.id = "username";
    username.innerText = USER.username;
    balance.id = "balance";
    balance.innerText = `$${USER.balance}`;

    userInfo.append(username, balance);

    const navLinks = document.createElement("ul");
    const scoreboard = document.createElement("li");
    const rules = document.createElement("li");
    scoreboard.id = "scoreboard";
    scoreboard.innerText = "Scoreboard";
    rules.id = "rules";
    rules.innerText = "Rules";

    scoreboard.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Loading scoreboard!");
    });

    navLinks.append(scoreboard, rules);

    nav.append(userInfo, navLinks);
    header.appendChild(nav);
    APP.container.appendChild(header);
  }
}
