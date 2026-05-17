const fs = require('fs/promises');
const path = require('path');
const {
  createPaymentSignature,
  createCallbackSignature,
  requestDuitkuPayment
} = require('../utils/duitku');

const ORDERS_PATH = path.join(__dirname, '..', '..', 'orders.json');
const ADMIN_WHATSAPP = process.env.ADMIN_WHATSAPP || '6288989983993';
const ALLOWED_PAYMENT_METHODS = new Set(['SP', 'DA', 'OV', 'VC', 'BT']);

function sanitizeText(value, maxLength = 300) {
  return String(value || '')
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function sanitizePhone(value) {
  return String(value || '').replace(/[^\d+]/g, '').slice(0, 20);
}

function sanitizeEmail(value) {
  return String(value || '').trim().toLowerCase().slice(0, 120);
}

function normalizeAmount(value) {
  const amount = Number(value);
  if (!Number.isFinite(amount) || amount <= 0) {
    return 0;
  }

  return Math.round(amount);
}

function normalizePaymentMethod(value) {
  const method = sanitizeText(value, 4).toUpperCase();
  return ALLOWED_PAYMENT_METHODS.has(method) ? method : 'SP';
}

function createOrderId() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `TT-${date}-${random}`;
}

async function readOrders() {
  try {
    const raw = await fs.readFile(ORDERS_PATH, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(ORDERS_PATH, '[]');
      return [];
    }
    throw error;
  }
}

async function writeOrders(orders) {
  await fs.writeFile(ORDERS_PATH, JSON.stringify(orders, null, 2));
}

function getDuitkuConfig() {
  const merchantCode = process.env.DUITKU_MERCHANT_CODE;
  const apiKey = process.env.DUITKU_API_KEY;
  const callbackUrl = process.env.DUITKU_CALLBACK_URL;
  const returnUrl = process.env.DUITKU_RETURN_URL;

  if (!merchantCode || !apiKey || !callbackUrl || !returnUrl) {
    const error = new Error('Konfigurasi Duitku belum lengkap. Periksa file .env.');
    error.statusCode = 500;
    throw error;
  }

  return { merchantCode, apiKey, callbackUrl, returnUrl };
}

function buildWhatsAppUrl(order) {
  const message = [
    'Halo TernakTugas, pembayaran saya sudah berhasil.',
    '',
    `Nama: ${order.customer.name}`,
    `Jenis tugas: ${order.service.type}`,
    `Total pembayaran: Rp ${order.amount.toLocaleString('id-ID')}`,
    `Order ID: ${order.orderId}`
  ].join('\n');

  return `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

async function createPayment(req, res) {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      serviceType,
      difficulty,
      deadline,
      totalPrice,
      paymentMethod,
      notes
    } = req.body;

    const amount = normalizeAmount(totalPrice);
    const cleanCustomerName = sanitizeText(customerName, 80);
    const cleanPhone = sanitizePhone(customerPhone);
    const cleanServiceType = sanitizeText(serviceType, 120);
    const cleanPaymentMethod = normalizePaymentMethod(paymentMethod);

    if (!cleanCustomerName || !cleanPhone || !cleanServiceType || amount <= 0) {
      return res.status(400).json({
        message: 'Data order belum lengkap atau total pembayaran tidak valid.'
      });
    }

    const { merchantCode, apiKey, callbackUrl, returnUrl } = getDuitkuConfig();
    const orderId = createOrderId();
    const returnUrlWithOrder = `${returnUrl}${returnUrl.includes('?') ? '&' : '?'}orderId=${encodeURIComponent(orderId)}`;
    const signature = createPaymentSignature({
      merchantCode,
      merchantOrderId: orderId,
      paymentAmount: amount,
      apiKey
    });

    const order = {
      orderId,
      customer: {
        name: cleanCustomerName,
        email: sanitizeEmail(customerEmail) || `${orderId.toLowerCase()}@ternaktugas.local`,
        phone: cleanPhone
      },
      service: {
        type: cleanServiceType,
        difficulty: sanitizeText(difficulty, 40),
        deadline: sanitizeText(deadline, 40),
        notes: sanitizeText(notes, 500)
      },
      paymentMethod: cleanPaymentMethod,
      amount,
      status: 'PENDING',
      reference: null,
      duitkuResponse: null,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    };

    const requestPayload = {
      merchantCode,
      paymentAmount: amount,
      merchantOrderId: orderId,
      paymentMethod: cleanPaymentMethod,
      productDetails: `TernakTugas - ${cleanServiceType}`,
      customerVaName: cleanCustomerName,
      email: order.customer.email,
      phoneNumber: cleanPhone,
      callbackUrl,
      returnUrl: returnUrlWithOrder,
      expiryPeriod: 60,
      signature
    };

    const duitkuResponse = await requestDuitkuPayment(requestPayload);
    const paymentUrl = duitkuResponse.paymentUrl || duitkuResponse.payment_url;

    if (!paymentUrl) {
      return res.status(502).json({
        message: 'Duitku tidak mengembalikan paymentUrl.',
        detail: duitkuResponse
      });
    }

    order.reference = duitkuResponse.reference || null;
    order.duitkuResponse = duitkuResponse;

    const orders = await readOrders();
    orders.push(order);
    await writeOrders(orders);

    return res.status(201).json({
      orderId,
      status: order.status,
      paymentUrl,
      amount
    });
  } catch (error) {
    console.error('createPayment error:', error.response?.data || error.message);
    return res.status(error.statusCode || 500).json({
      message: error.statusCode ? error.message : 'Gagal membuat pembayaran.',
      detail: process.env.NODE_ENV === 'development' ? error.response?.data || error.message : undefined
    });
  }
}

async function paymentCallback(req, res) {
  try {
    const {
      merchantCode,
      amount,
      merchantOrderId,
      resultCode,
      reference,
      signature
    } = req.body;

    const { apiKey } = getDuitkuConfig();
    const expectedSignature = createCallbackSignature({
      merchantCode,
      amount,
      merchantOrderId,
      apiKey
    });

    if (signature !== expectedSignature) {
      return res.status(401).json({ message: 'Invalid callback signature.' });
    }

    const orders = await readOrders();
    const orderIndex = orders.findIndex((order) => order.orderId === merchantOrderId);

    if (orderIndex === -1) {
      return res.status(404).json({ message: 'Order tidak ditemukan.' });
    }

    const statusMap = {
      '00': 'PAID',
      '01': 'PENDING',
      '02': 'EXPIRED'
    };
    const status = statusMap[resultCode] || 'FAILED';
    orders[orderIndex] = {
      ...orders[orderIndex],
      status,
      reference: reference || orders[orderIndex].reference,
      callbackPayload: req.body,
      updatedAt: new Date().toISOString()
    };

    await writeOrders(orders);

    return res.status(200).json({ message: 'Callback processed.', status });
  } catch (error) {
    console.error('paymentCallback error:', error.message);
    return res.status(500).json({ message: 'Gagal memproses callback.' });
  }
}

async function getOrder(req, res) {
  try {
    const orderId = sanitizeText(req.params.orderId, 40);
    const orders = await readOrders();
    const order = orders.find((item) => item.orderId === orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order tidak ditemukan.' });
    }

    if (order.status === 'PENDING' && order.expiresAt && new Date(order.expiresAt).getTime() < Date.now()) {
      order.status = 'EXPIRED';
      order.updatedAt = new Date().toISOString();
      await writeOrders(orders);
    }

    return res.json({
      ...order,
      whatsappUrl: buildWhatsAppUrl(order)
    });
  } catch (error) {
    return res.status(500).json({ message: 'Gagal mengambil data order.' });
  }
}

module.exports = {
  createPayment,
  paymentCallback,
  getOrder
};
