var express = require("express");
var router = express.Router();
const booksModel = require("../models/book");
const author = require("../models/author");

router.get("/", async (req, res, next) => {
  const bookList = await booksModel.find();
  const bookListWithLinks = bookList.map((book) => {
    return {
      title: book.title,
      summary: book.summary,
      url: book.url,
    };
  });
  console.log(bookListWithLinks);
  res.render("books", { bookList: bookListWithLinks });
});

router.get("/:id", async (req, res, next) => {
  const book = await booksModel.findById(req.params.id).populate("author");
  res.render("bookPage", { book });
});

module.exports = router;
