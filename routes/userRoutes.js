const express = require('express');
const { registerUser, loginUser, getUserProfile, resetPassword } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/reset-password', resetPassword);
router.get('/profile', protect, getUserProfile);

module.exports = router;
