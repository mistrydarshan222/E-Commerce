const express = require('express');
const router = express.Router();
const { createProduct, updateProduct, deleteProduct } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/products', authMiddleware, createProduct);
router.put('/products/:id', authMiddleware, updateProduct);
router.delete('/products/:id', authMiddleware, deleteProduct);

module.exports = router;
