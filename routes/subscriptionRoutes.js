const express = require('express');
const { createSubscription, getSubscription, cancelSubscription } = require('../controllers/subscriptionController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createSubscription);
router.get('/:id', protect, getSubscription);
router.post('/cancel', protect, cancelSubscription);

module.exports = router;
