var express = require("express");
var router = express.Router();
const booksModel = require("../models/book");
const author = require("../models/author");
const genre = require("../models/genre");

router.get("/", async (req, res, next) => {
  const bookList = await booksModel.find();
  const bookListWithLinks = bookList.map((book) => {
    return {
      title: book.title,
      summary: book.summary,
      url: book.url,
    };
  });
  res.render("books", { bookList: bookListWithLinks });
});

router.get("/create-book", async (req, res, next) => {
  const authors = await author.find();
  const genres = await genre.find();
  res.render("createBook", { authors, genres });
});

router.post("/create-book", async (req, res, next) => {
  console.log(req.body);
  res.send(req.body);
});

router.get("/:id", async (req, res, next) => {
  const book = await booksModel.findById(req.params.id).populate("author");
  res.render("bookPage", { book });
});

module.exports = router;
