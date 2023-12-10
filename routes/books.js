const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json"); // issued book only present in the user.json
const router = express.Router();

/*
Getting all books 

--Route: /books
--METHOD: GET
--Decription: Getting all books
--Access: Public
--Parameter: none
*/
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Got all the books",
    data: books,
  });
});

/*
 Get a single book by their id 

--Route: /books/:id
--METHOD: GET
--Decription: Get a single book by their id 
--Access: Public
--Parameter: ID
*/

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id === id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found or not exist",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Book found by their ID",
    data: book,
  });
});

/*
 Getting all issued books

--Route: /books/issued
--METHOD: GET
--Decription: Getting all issued books
--Access: Public
--Parameter: none
*/

router.get("/issued/by-user", (req, res) => {
  const usersWithTheIssuedBook = users.filter((each) => {
    if (each.issuedBook) return each;
  });
  const issuedBooks = [];
  usersWithTheIssuedBook.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBook);
    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;

    issuedBooks.push(book);
  });
  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No book have been issued yet..",
    });
  }
  return res.status(200).json({
    success: true,
    message: "User with the issued book...",
    data: issuedBooks,
  });
});

module.exports = router;
