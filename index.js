//Build out and test JS code
//Then organize into classes after

let loginButton = document.querySelector("#login input[type='submit']");
let userName = document.getElementById("username");
let password = document.getElementById("password");

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(userName.value);
  console.log(password.value);
});
