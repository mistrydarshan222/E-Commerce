const Product = require('../models/Product');

// Create a new product
const createProduct = async (req, res) => {
  const { name, description, price, category, stock, imageUrl } = req.body;
  const product = new Product({ name, description, price, category, stock, imageUrl });

  try {
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an existing product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, stock, imageUrl } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(id, { name, description, price, category, stock, imageUrl }, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an existing product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct
};
