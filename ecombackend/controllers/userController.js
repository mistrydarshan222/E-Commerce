const User = require('../models/User');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

const uploadImage = async (req, res) => {
  const userId = req.params.id;
  const imageUrl = req.file ? `uploads/${req.file.filename}` : '';

  try {
    const user = await User.findByIdAndUpdate(userId, { imageUrl }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  upload,
  uploadImage
};
