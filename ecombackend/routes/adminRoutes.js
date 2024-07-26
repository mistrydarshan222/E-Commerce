const express = require('express');
const router = express.Router();
const { createProduct, updateProduct, deleteProduct, upload } = require('../controllers/adminController');
const { createCategory, getCategories } = require('../controllers/categoryController');

router.post('/products', upload.single('image'), createProduct);
router.put('/products/:id', upload.single('image'), updateProduct);
router.delete('/products/:id', deleteProduct);

router.post('/categories', createCategory);
router.get('/categories', getCategories);

module.exports = router;
