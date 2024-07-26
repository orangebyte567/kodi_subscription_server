const express = require('express');
const { getAllUsers, getUserDetails, getReports } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/users', protect, admin, getAllUsers);
router.get('/user/:id', protect, admin, getUserDetails);
router.get('/reports', protect, admin, getReports);

module.exports = router;
