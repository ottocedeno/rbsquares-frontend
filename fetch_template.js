const userData = {
  username: "anakin",
  password: "dev",
};

fetch("http://localhost:3000/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({
    user: userData,
  }),
})
  .then((r) => r.json())
  .then((obj) => {
    console.log(obj);
  });
