class Form {
  static UserCredentials() {
    const userName = document.getElementById("username");
    const password = document.getElementById("password");

    const user = {
      username: userName.value,
      password: password.value,
    };

    return user;
  }
}
