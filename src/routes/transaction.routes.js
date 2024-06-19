const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction');
const { authenticateJWT, isAdmin } = require('../middleware/auth.middleware');

// Get all transactions (admin only)
router.get('/', authenticateJWT, isAdmin, transactionController.getTransactions);

// Get transaction by ID
router.get('/:id', authenticateJWT, transactionController.getTransactionById);

// Create a new transaction
router.post('/', authenticateJWT, transactionController.createTransaction);

// Update transaction by ID
router.put('/:id', authenticateJWT, transactionController.updateTransaction);

// Delete transaction by ID
router.delete('/:id', authenticateJWT, isAdmin, transactionController.deleteTransaction);

module.exports = router;