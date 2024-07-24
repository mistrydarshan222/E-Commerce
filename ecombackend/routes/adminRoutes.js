const express = require('express');
const router = express.Router();
const { createProduct, updateProduct, deleteProduct } = require('../controllers/adminController');

router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;
