const express = require("express");
const app = express();
const port = 8081;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running :-",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
