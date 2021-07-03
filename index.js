require("dotenv").config();

//Frameworks
const express = require("express");

const mongoose = require("mongoose");

//database
const database = require("./database/database");

//intailizing
const booky = express();
booky.use(express.json());
//Models
const BookModel = require("./database/books");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    // useUnifiedopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("connection established!!!!!!!"));

/*
Route           /
Description     get all books
Access          PUBLIC
Parameters      NONE
Method          GET
*/
booky.get("/", async (req, res) => {
  const getAllBooks = await BookModel.find();
  return res.json(getAllBooks);
});
/*
Route           /is
Description     get a specific book based on isbn
Access          PUBLIC
Parameters      isbn
Method          GET
*/
booky.get("/is/:isbn", async (req, res) => {
  const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });
  if (!getSpecificBook) {
    return res.json({
      error: `No book found for ISBN of ${req.params.isbn}`,
    });
  }
  return res.json({ books: getSpecificBook });
});
/*
Route           /c
Description     get specific books based on a category
Access          PUBLIC
Parameters      category
Method          GET
*/
booky.get("/c/:category", async (req, res) => {
  const getSpecificBooks = await BookModel.findOne({
    category: req.params.category,
  });

  if (!getSpecificBooks) {
    return res.json({
      error: `No book found for the category of ${req.params.category}`,
    });
  }

  return res.json({ books: getSpecificBooks });
});
/*
Route           /lang
Description     get specific books based on a language
Access          PUBLIC
Parameters      lang
Method          GET
*/
booky.get("/lang/:lang", async (req, res) => {
  const getSpecificBooks = await BookModel.findOne({ language: req.params.id });

  if (!getSpecificBooks) {
    return res.json({
      error: `No book found for the language of ${req.params.lang}`,
    });
  }

  return res.json({ books: getSpecificBooks });
});
/*
Route           /book/author/
Description     get specific books based on a author id
Access          PUBLIC
Parameters      id
Method          GET
*/
booky.get("/book/author/:id", async (req, res) => {
  const authorId = req.params.id;
  const getSpecificBook = await BookModel.findOne({
    author: { $all: [authorId] },
  });

  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No book found for the author of id : ${req.params.id}`,
    });
  }

  return res.json({ books: getSpecificBook });
});
/*
Route           /author
Description     get all authors
Access          PUBLIC
Parameters      NONE
Method          GET
*/
booky.get("/author", async (req, res) => {
  const getAllAuthors = await AuthorModel.find();
  return res.json({ authors: getAllAuthors });
});
/*
Route           /author/id
Description     get specific author based on a id
Access          PUBLIC
Parameters      id
Method          GET
*/
booky.get("/author/id/:id", async (req, res) => {
  const getSpecificAuthor = AuhtorModel.findOne({
    id: parseInt(req.params.id),
  });
  if (!getSpecificAuthor) {
    return res.json({
      error: `No author found for the id : ${req.params.id}`,
    });
  }
  return res.json({ author: getSpecificAuthor });
});
/*
Route           /author
Description     get lsit authors based on a book isbn
Access          PUBLIC
Parameters      isbn
Method          GET
*/
booky.get("/author/:isbn", async (req, res) => {
  const getSpecificAuthors = await AuthorModel.find({
    books: { $all: [req.params.isbn] },
  });

  if (!getSpecificAuthors) {
    return res.json({
      error: `No author found for the book ${req.params.isbn}`,
    });
  }
  return res.json({ author: getSpecificAuthors });
});
/*
Route           /publications
Description     get all publications
Access          PUBLIC
Parameters      NONE
Method          GET
*/
booky.get("/publications", (req, res) => {
  const getPublications = PublicationModel.find();
  return res.json({ publications: getPublications });
});
/*
Route           /publications/id
Description     get specific publication based on a id
Access          PUBLIC
Parameters      id
Method          GET
*/
booky.get("/publications/id/:id", (req, res) => {
  const getSpecificPublication = PublicationModel.findOne({
    id: parseInt(req.params.id),
  });
  if (!getSpecificPublication) {
    return res.json({
      error: `No author found for the id : ${req.params.id}`,
    });
  }
  return res.json({ author: getSpecificPublication });
});
/*
Route           /publication/book
Description     get lsit publication based on a book isbn
Access          PUBLIC
Parameters      isbn
Method          GET
*/
booky.get("/publications/book/:isbn", (req, res) => {
  const getSpecificPublication = PublicationModel.find({
    books: { $all: [req.params.isbn] },
  });

  if (!getSpecificPublication) {
    return res.json({
      error: `No publication found for the book ${req.params.isbn}`,
    });
  }
  return res.json({ author: getSpecificPublication });
});
// _______________________________________________________________________________________
//
// ██████╗░░█████╗░░██████╗████████╗
// ██╔══██╗██╔══██╗██╔════╝╚══██╔══╝
// ██████╔╝██║░░██║╚█████╗░░░░██║░░░
// ██╔═══╝░██║░░██║░╚═══██╗░░░██║░░░
// ██║░░░░░╚█████╔╝██████╔╝░░░██║░░░
// ╚═╝░░░░░░╚════╝░╚═════╝░░░░╚═╝░░░
/*
Route           /book/add
Description     add new book
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
booky.post("/book/add", async (req, res) => {
  const { newBook } = req.body;
  BookModel.create(newBook);
  return res.json({ books: newBook });
});
/*
Route           /author/add
Description     add new author
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
booky.post("/author/add", (req, res) => {
  const { newAuthor } = req.body;
  AuthorModel.create(newAuthor);
  return res.json({ author: newAuthor });
});
/*
Route           /publication/add
Description     add new publication
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
booky.post("/publication/add", (req, res) => {
  const { newPublication } = req.body;
  PublicationModel.create(newPublication);
  return res.json({ publications: newPublication });
});

// ██████╗░██╗░░░██╗████████╗
// ██╔══██╗██║░░░██║╚══██╔══╝
// ██████╔╝██║░░░██║░░░██║░░░
// ██╔═══╝░██║░░░██║░░░██║░░░
// ██║░░░░░╚██████╔╝░░░██║░░░
// ╚═╝░░░░░░╚═════╝░░░░╚═╝░░░
/*
Route           /book/update/title
Description     update book title
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
booky.put("/book/update/title/:isbn", async (req, res) => {
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      title: req.body.newBookTitle,
    },
    {
      new: true,
    }
  );
  
  res.json({ books: updatedBook });
});
/*
Route           /book/update/author
Description     update book author
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
booky.put("/book/update/title/:isbn/:authorId", (req, res) => {
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      return book.author.push(parseInt(req.params.authorId));
    }
  });
  database.author.forEach((author) => {
    if (author.id === parseInt(req.params.authorId)) {
      return author.books.push(req.params.isbn);
    }
  });
  res.json({ books: database.books, author: database.author });
});
/*
Route           /author/update/name
Description     update book author
Access          PUBLIC
Parameter       name,id
Methods         PUT
*/
booky.put("/author/update/name/:id/:name", (req, res) => {
  database.author.forEach((auhtor) => {
    if (auhtor.id === parseInt(req.params.id)) {
      return (auhtor.name = req.params.name);
    }
  });
  res.json({ author: database.author });
});
/*
Route           /publication/update/name
Description     update book author
Access          PUBLIC
Parameter       name,id
Methods         PUT
*/
booky.put("/publications/update/name/:id/:name", (req, res) => {
  database.publications.forEach((publication) => {
    if (publication.id === parseInt(req.params.id)) {
      return (publication.name = req.params.name);
    }
  });
  res.json({ publications: database.publications });
});
/*
Route           /publication/update/book
Description     update/add new book to a publication
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
booky.put("/publication/update/book/:isbn", (req, res) => {
  // update the publication database
  database.publications.forEach((publication) => {
    if (publication.id === req.body.pubId) {
      return publication.books.push(req.params.isbn);
    }
  });

  // update the book database
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.publication = req.body.pubId;
      return;
    }
  });

  return res.json({
    books: database.books,
    publications: database.publications,
    message: "Successfully updated publication",
  });
});

// ██████╗░███████╗██╗░░░░░███████╗████████╗███████╗
// ██╔══██╗██╔════╝██║░░░░░██╔════╝╚══██╔══╝██╔════╝
// ██║░░██║█████╗░░██║░░░░░█████╗░░░░░██║░░░█████╗░░
// ██║░░██║██╔══╝░░██║░░░░░██╔══╝░░░░░██║░░░██╔══╝░░
// ██████╔╝███████╗███████╗███████╗░░░██║░░░███████╗
// ╚═════╝░╚══════╝╚══════╝╚══════╝░░░╚═╝░░░╚══════╝
/*
Route           /book/delete
Description     delete a book
Access          PUBLIC
Parameters      isbn
Method          DELETE
*/
booky.delete("/book/delete/:isbn", (req, res) => {
  const updatedBookDatabase = database.books.filter(
    (book) => book.ISBN !== req.params.isbn
  );

  database.books = updatedBookDatabase;
  return res.json({ books: database.books });
});
/*
Route           /book/delete/author
Description     delete a author from a book
Access          PUBLIC
Parameters      isbn, author id
Method          DELETE
*/
booky.delete("/book/delete/author/:isbn/:authorId", (req, res) => {
  // update the book database
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      const newAuthorList = book.authors.filter(
        (author) => author !== parseInt(req.params.authorId)
      );
      book.authors = newAuthorList;
      return;
    }
  });

  // update the author database
  database.authors.forEach((author) => {
    if (author.id === parseInt(req.params.authorId)) {
      const newBooksList = author.books.filter(
        (book) => book !== req.params.isbn
      );

      author.books = newBooksList;
      return;
    }
  });

  return res.json({
    message: "author was deleted!!!!!!😪",
    book: database.books,
    author: database.authors,
  });
});
/*
Route           /author/delete/
Description     delete a author from a book
Access          PUBLIC
Parameters       author id
Method          DELETE
*/
booky.delete("/author/delete/:id", (req, res) => {
  const updatedAuthorDatabase = database.author.filter(
    (author) => author.id !== parseInt(req.params.id)
  );

  database.auhtor = updatedAuthorDatabase;
  return res.json({ author: updatedAuthorDatabase });
});
/*
Route           /publication/delete/book
Description     delete a book from publication 
Access          PUBLIC
Parameters      isbn, publication id
Method          DELETE
*/
booky.delete("/publication/delete/book/:isbn/:pubId", (req, res) => {
  // update publication database
  database.publications.forEach((publication) => {
    if (publication.id === parseInt(req.params.pubId)) {
      const newBooksList = publication.books.filter(
        (book) => book !== req.params.isbn
      );

      publication.books = newBooksList;
      return;
    }
  });

  // update book database
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.publication = 0; // no publication available
      return;
    }
  });

  return res.json({
    books: database.books,
    publications: database.publications,
  });
});
booky.listen(3000);
