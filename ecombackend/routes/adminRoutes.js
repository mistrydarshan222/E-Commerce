const express = require('express');
const router = express.Router();
const { createProduct, updateProduct, deleteProduct, getProducts, getProductById, upload } = require('../controllers/adminController');

router.post('/products', upload.single('image'), createProduct);
router.put('/products/:id', upload.single('image'), updateProduct);
router.delete('/products/:id', deleteProduct);
router.get('/products', getProducts);
router.get('/products/:id', getProductById); // Add this

module.exports = router;
