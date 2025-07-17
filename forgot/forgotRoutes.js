const express = require('express');
const forgotController = require('./forgotController');
const authMiddleware = require('../authMiddleware');

const router = express.Router();

// Public routes
router.post('/send-otp', forgotController.sendOTP);
router.post('/verify-otp', forgotController.verifyOTP);
router.post('/reset-password', forgotController.resetPassword);

// Protected route for authenticated users
router.post('/change-password', authMiddleware, forgotController.changePassword.bind(forgotController));

module.exports = router;
