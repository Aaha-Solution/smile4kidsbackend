const express = require('express');
const signupController = require('./signupController'); // No "new" needed

const router = express.Router();

router.post('/', signupController.createUser);
router.post('/update-profile', signupController.updateProfile);
router.get('/profile', signupController.getProfile);

module.exports = router;
