const express = require('express');
const { createPayment, executePayment, cancelPayment } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', protect, createPayment);
router.post('/execute', protect, executePayment);
router.post('/cancel', protect, cancelPayment);

module.exports = router;
