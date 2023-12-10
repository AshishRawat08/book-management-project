const express = require("express");

const usersRoute = require("./routes/users.js");
const booksRoute = require("./routes/books.js");

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

app.use("/users", usersRoute);
app.use("/books", booksRoute);

app.get("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "This route does not exits",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
