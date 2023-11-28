// controllers/bookController.js
const Book = require('../models/book.model');
const errorHandler = require('../utils/errorHandler.utils');

exports.addBook = async (req, res) => {
    const { title, author, ISBN } = req.body;

    try {
        let book = await Book.findOne({ ISBN });

        if (book) {
            return res.status(400).json({ message: 'Book with this ISBN already exists' });
        }

        book = new Book({
            title,
            author,
            ISBN,
        });

        await book.save();

        res.json(book);
    } catch (error) {
        console.error(error.message);
        errorHandler.handleError(res, 500, 'Internal Server Error');
    }
};

exports.getBook = async (req, res) => {
    const bookId = req.params.id;

    try {
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json(book);
    } catch (error) {
        console.error(error.message);
        errorHandler.handleError(res, 500, 'Internal Server Error');
    }
};

exports.updateBook = async (req, res) => {
    const bookId = req.params.id;
    const { title, author, ISBN } = req.body;

    try {
        let book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        book.title = title || book.title;
        book.author = author || book.author;
        book.ISBN = ISBN || book.ISBN;

        await book.save();

        res.json(book);
    } catch (error) {
        console.error(error.message);
        errorHandler.handleError(res, 500, 'Internal Server Error');
    }
};

exports.deleteBook = async (req, res) => {
    const bookId = req.params.id;

    try {
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        await book.remove();

        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error(error.message);
        errorHandler.handleError(res, 500, 'Internal Server Error');
    }
};

exports.listBooks = async (req, res) => {
    try {
        const books = await Book.find();

        res.json(books);
    } catch (error) {
        console.error(error.message);
        errorHandler.handleError(res, 500, 'Internal Server Error');
    }
};

exports.searchBooks = async (req, res) => {
    const { title, author, ISBN } = req.query;
  
    try {
      let query = {};
  
      if (title) {
        query.title = { $regex: new RegExp(title, 'i') };
      }
  
      if (author) {
        query.author = { $regex: new RegExp(author, 'i') };
      }
  
      if (ISBN) {
        query.ISBN = { $regex: new RegExp(ISBN, 'i') };
      }
  
      const books = await Book.find(query);
  
      res.json(books);
    } catch (error) {
      console.error(error.message);
      errorHandler.handleError(res, 500, 'Internal Server Error');
    }
  };




