const express = require("express");
const { users } = require("./data/users.json");
const app = express();
const port = 8081;

app.use(express.json());

app.get("/", (req, res) => {
  // res.status(200).send("Server is up", "hey");    // cant send multiple data with send that's why using json
  res.status(200).json({
    message: "Server is up and ruuning :-)",
    data: "hey",
  });
});

/*
--Route: /users
--METHOD: GET
--Decription: Get all users
--Access: Public
--Parameter: none
*/

app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This route does not exits",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
