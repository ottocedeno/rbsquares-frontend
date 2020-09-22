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

    scoreboard.addEventListener("click", this.getScoreboardData);

    navLinks.append(scoreboard, rules);

    nav.append(userInfo, navLinks);
    header.appendChild(nav);
    APP.container.appendChild(header);
  }

  static getScoreboardData() {
    fetch("http://localhost:3000/users", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt_token")}`,
      },
    })
      .then((resp) => resp.json())
      .then((object) => {
        Nav.renderScoreboardCard(object.users.data);
      });
  }

  static renderScoreboardCard(users) {
    const dimContainer = Utility.createDimBackground();

    const scoreboardContainer = document.createElement("div");
    scoreboardContainer.id = "scoreboard-container";

    const scoreboardCard = document.createElement("div");
    scoreboardCard.classList.add("animate__animated", "animate__flipInY");
    setTimeout(() => {
      scoreboardCard.classList.remove("animate__flipInY");
    }, 1300);
    scoreboardCard.id = "scoreboard-card";

    const scoreboardTitle = document.createElement("h1");
    scoreboardTitle.innerText = "top 5 scores";

    //Add users here
    const usersList = document.createElement("ul");

    for (let i = 0; i < 5; i++) {
      let listItem = document.createElement("li");
      let username = document.createElement("p");
      let userBalance = document.createElement("p");
      username.innerText = users[i].attributes.username;
      userBalance.innerText = `$${users[i].attributes.balance}`;

      listItem.append(username, userBalance);
      usersList.appendChild(listItem);
    }

    const backToGameBtn = document.createElement("button");
    backToGameBtn.className = "btn-secondary";
    backToGameBtn.innerText = "back to game";
    backToGameBtn.addEventListener("click", (e) => {
      e.target.parentNode.classList.add("animate__flipOutY");
      setTimeout(() => {
        Utility.removeCard(e.target.parentNode);
      }, 1000);
    });

    scoreboardCard.append(scoreboardTitle, usersList, backToGameBtn);
    scoreboardContainer.appendChild(scoreboardCard);
    APP.container.append(dimContainer, scoreboardContainer);
  }
}
