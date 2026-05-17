const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const paymentRoutes = require('./routes/payment');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', paymentRoutes);

const publicRoot = path.join(__dirname, '..');
app.use(express.static(publicRoot));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicRoot, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`TernakTugas server running on http://localhost:${PORT}`);
});
