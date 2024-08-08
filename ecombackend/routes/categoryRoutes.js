const express = require('express');
const router = express.Router();
const { createCategory, getCategories, deleteCategory } = require('../controllers/categoryController');

router.post('/', createCategory);
router.get('/', getCategories);
router.delete('/:id', deleteCategory); // Ensure this route exists

module.exports = router;
