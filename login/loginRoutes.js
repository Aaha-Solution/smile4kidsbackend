const express = require('express');
const loginController = require('./loginController');

const router = express.Router();

// Route: User login
router.post('/', loginController.login);

module.exports = router;
