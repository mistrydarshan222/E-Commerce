const Product = require('../models/Product');
const Category = require('../models/Category');
const multer = require('multer');
const path = require('path');

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage }).single('image');

const createProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  const imageUrl = req.file ? `uploads/${req.file.filename}` : '';

  try {
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    const product = new Product({ name, description, price, category, stock, imageUrl });
    await product.save();
    console.log('Product saved:', product); // Debug log
    res.status(201).json(product);
  } catch (err) {
    console.error('Error saving product:', err); // Debug log
    res.status(400).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, stock } = req.body;
  const imageUrl = req.file ? `uploads/${req.file.filename}` : '';
  const updateData = { name, description, price, category, stock, imageUrl };

  try {
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    const product = await Product.findByIdAndUpdate(id, updateData, { new: true }).populate('category', 'name');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Error updating product:', err); // Debug log
    res.status(400).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err); // Debug log
    res.status(500).json({ message: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category', 'name');
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err); // Debug log
    res.status(500).json({ message: err.message });
  }
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id).populate('category', 'name');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Error fetching product:', err); // Debug log
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProduct,
  upload
};
