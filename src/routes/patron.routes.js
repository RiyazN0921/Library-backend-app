// routes/patronRoutes.js
const express = require('express');
const patronController = require('../controllers/patron.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// CRUD operations for patrons
router.post('/', authMiddleware.authenticate, authMiddleware.authorizeAdmin, patronController.addPatron);
router.get('/:id', patronController.getPatron);
router.put('/:id', authMiddleware.authenticate, authMiddleware.authorizeAdmin, patronController.updatePatron);
router.delete('/:id', authMiddleware.authenticate, authMiddleware.authorizeAdmin, patronController.deletePatron);
router.get('/', patronController.listPatrons);
router.get('/search', patronController.searchPatrons);

module.exports = router;
