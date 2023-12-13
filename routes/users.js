const express = require("express");
const { users } = require("../data/users.json");
const router = express.Router();
/*
Get all users 

--Route: /
--METHOD: GET
--Decription: Get all users
--Access: Public
--Parameter: none
*/

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

// http://localhost:8081/users:id(4)
/*
 Get a single user by their id 

--Route: /:id
--METHOD: GET
--Decription: Get a single user by their id 
--Access: Public
--Parameter: ID
*/

// Define a route for getting a single user by their ID ("/users/:id")
router.get("/:id", (req, res) => {
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

--Route: /
--METHOD: POST
--Decription: Creating a new user
--Access: Public
--Parameter: none
*/

// Define a route for creating a new user ("/users")
router.post("/", (req, res) => {
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

--Route: /:id
--METHOD: PUT
--Decription: Updating  auser by their ID
--Access: Public
--Parameter: ID
*/
router.put("/:id", (req, res) => {
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

--Route: /:id
--METHOD: DELETE
--Decription: Deleting a user by their ID
--Access: Public
--Parameter: ID
*/
router.delete("/:id", (req, res) => {
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
  const index = users.indexOf(user);
  users.splice(index, 1);

  return res.status(200).json({
    success: true,
    message: "Deleted user",
    data: users,
  });
});

/*
Delete a user by their ID

--Route: /users/subscription-details/:id
--METHOD: GET
--Decription: Get all users subscription details with fine
--Access: Public
--Parameter: ID
*/

router.get("/subscription-details/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User with the ID did not exist",
    });
  }
  const getDateInDays = (data = "") => {
    let date;
    if (data === "") {
      date = new Date();
    } else {
      date = new Date(data);
    }
    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };

  const subscriptionType = (date) => {
    if (user.subscriptionType === "Basic") {
      date = date + 90;
    } else if (user.subscriptionType === "Standard") {
      date = date + 180;
    } else if (user.subscriptionType === "Premium") {
      date = date + 365;
    }
    return date;
  };

  // Jan 1 1970 UTC
  let returnDate = getDateInDays(user.returnDate);
  let currentDate = getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDate);

  // console.log("returnDate ", returnDate);
  // console.log("currentDate ", currentDate);
  // console.log("subscriptionDate ", subscriptionDate);
  // console.log("subscriptionExpiration ", subscriptionExpiration);

  const data = {
    ...user,
    isSubscriptionExpired: subscriptionExpiration < currentDate,
    daysLeftForExpiration:
      subscriptionExpiration <= currentDate
        ? 0
        : subscriptionExpiration - currentDate,
    fine:
      returnDate < currentDate
        ? subscriptionExpiration <= currentDate
          ? 100
          : 50
        : 0,
  };
  return res.status(200).json({
    success: true,
    message: "Subscription detail for the user is: ",
    data,
  });
});
module.exports = router;
