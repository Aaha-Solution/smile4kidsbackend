const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ImageModel = require('./imageModel');

const router = express.Router();

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, '../assets/images');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Route: Get all images
router.get('/', async (req, res) => {
  try {
    const images = await ImageModel.getAll();
    res.status(200).json(images);
  } catch {
    res.status(500).json({ message: 'Failed to retrieve images' });
  }
});

// Route: Get image by ID
router.get('/:id', async (req, res) => {
  try {
    const image = await ImageModel.getById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.status(200).json(image);
  } catch {
    res.status(500).json({ message: 'Failed to retrieve image' });
  }
});

// Route: Upload image
router.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const imagePath = `/assets/images/${req.file.filename}`;
  try {
    const savedImage = await ImageModel.save(imagePath);
    res.status(201).json({ message: 'Image uploaded successfully', image: savedImage });
  } catch {
    res.status(500).json({ message: 'Failed to save image' });
  }
});

module.exports = router;
