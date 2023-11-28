//api route => /api/book
const express = require('express');
const bookController = require('../controllers/book.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', authMiddleware.authenticate, authMiddleware.authorizeAdmin, bookController.addBook);
router.get('/:id', bookController.getBook);
router.put('/:id', authMiddleware.authenticate, authMiddleware.authorizeAdmin, bookController.updateBook);
router.delete('/:id', authMiddleware.authenticate, authMiddleware.authorizeAdmin, bookController.deleteBook);
router.get('/', bookController.listBooks);
router.get('/search', bookController.searchBooks);

module.exports = router;
