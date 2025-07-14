const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ImageModel = require('./imageModel');
const router = express.Router();

// ✅ Ensure assets/images directory exists
const uploadDir = path.join(__dirname, '../assets/images');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// ✅ Get all images
router.get('/', async (req, res) => {
  try {
    const images = await ImageModel.getAll();
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get image by id
router.get('/:id', async (req, res) => {
  try {
    const image = await ImageModel.getById(req.params.id);
    if (!image) return res.status(404).json({ error: 'Image not found' });
    res.json(image);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Upload image
router.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const imagePath = `/assets/images/${req.file.filename}`;
  try {
    const image = await ImageModel.save(imagePath);
    res.json({ message: 'Image uploaded', image });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
