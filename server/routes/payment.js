const express = require('express');
const {
  createPayment,
  paymentCallback,
  getOrder
} = require('../controllers/paymentController');

const router = express.Router();

router.post('/create-payment', createPayment);
router.post('/payment-callback', paymentCallback);
router.get('/orders/:orderId', getOrder);

module.exports = router;
