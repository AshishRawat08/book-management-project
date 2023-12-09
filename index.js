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
Get all users 

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

// http://localhost:8081/users:id(4)
/*
 Get a single user by their id 

--Route: /users/:id
--METHOD: GET
--Decription: Get a single user by their id 
--Access: Public
--Parameter: ID
*/

// Define a route for getting a single user by their ID ("/users/:id")
app.get("/users/:id", (req, res) => {
  // Extract the 'id' parameter from the URL
  const { id } = req.params;

  // Find the user with the specified ID in the 'users' array
  const user = users.find((each) => each.id === id);

  // If the user is not found, send a 404 Not Found response
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exist!!!",
    });
  }

  // If the user is found, send a JSON response with the user's information
  return res.status(200).json({
    success: true,
    message: "User Found",
    data: user,
  });
});

/*
Creating a new user

--Route: /users
--METHOD: POST
--Decription: Creating a new user
--Access: Public
--Parameter: none
*/

// Define a route for creating a new user ("/users")
app.post("/users", (req, res) => {
  // Destructure the properties from the request body
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;

  // Check if a user with the same ID already exists
  const user = users.find((each) => each.id === id);
  if (user) {
    // If the user already exists, send a 404 response
    return res.status(404).json({
      success: false,
      data: "User with the ID already exist",
    });
  }

  // If the user does not exist, add the new user to the 'users' array
  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });

  // Send a JSON response indicating that the user was added successfully
  return res.status(201).json({
    success: true,
    message: "User added successfully",
    data: users,
  });
});

/*
Updating  a user by their ID

--Route: /users/:id
--METHOD: PUT
--Decription: Updating  auser by their ID
--Access: Public
--Parameter: ID
*/
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  // Find the user with the specified ID in the 'users' array
  const user = users.find((each) => each.id === id);

  // If the user is not found, send a 404 Not Found response
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exist!!!",
    });
  }
  const updateUserData = users.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  res.status(200).json({
    success: true,
    message: "User updated",
    data: updateUserData,
  });
});

/*
Delete a user by their ID

--Route: /users/:id
--METHOD: DELTE
--Decription: Deleting a user by their ID
--Access: Public
--Parameter: ID
*/
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  // Find the user with the specified ID in the 'users' array
  const user = users.find((each) => each.id === id);

  // If the user is not found, send a 404 Not Found response
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exist!!!",
    });
  }
  // need to build logic for delete....
});

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This route does not exits",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
