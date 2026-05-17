const crypto = require('crypto');
const axios = require('axios');

const DUITKU_BASE_URL = process.env.DUITKU_BASE_URL || 'https://sandbox.duitku.com/webapi/api/merchant/v2';

function md5(value) {
  return crypto.createHash('md5').update(value).digest('hex');
}

function createPaymentSignature({ merchantCode, merchantOrderId, paymentAmount, apiKey }) {
  return md5(`${merchantCode}${merchantOrderId}${paymentAmount}${apiKey}`);
}

function createCallbackSignature({ merchantCode, amount, merchantOrderId, apiKey }) {
  return md5(`${merchantCode}${amount}${merchantOrderId}${apiKey}`);
}

async function requestDuitkuPayment(payload) {
  const response = await axios.post(`${DUITKU_BASE_URL}/inquiry`, payload, {
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 15000
  });

  return response.data;
}

module.exports = {
  createPaymentSignature,
  createCallbackSignature,
  requestDuitkuPayment
};
