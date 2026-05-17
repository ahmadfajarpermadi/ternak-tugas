# TernakTugas

Platform jasa digital TernakTugas dengan frontend HTML/CSS/Vanilla JS, backend Node.js + Express, penyimpanan `orders.json`, dan integrasi Duitku POP API sandbox.

## Struktur

```text
.
├── index.html
├── success.html
├── failed.html
├── css/
├── js/
├── assets/
├── server/
│   ├── server.js
│   ├── routes/payment.js
│   ├── controllers/paymentController.js
│   └── utils/duitku.js
├── orders.json
├── package.json
└── .env.example
```

## Setup

1. Install dependency:

```bash
npm install
```

2. Buat file `.env` dari contoh:

```bash
cp .env.example .env
```

3. Isi credential Duitku sandbox:

```env
DUITKU_BASE_URL=https://sandbox.duitku.com/webapi/api/merchant/v2
DUITKU_MERCHANT_CODE=DS12345
DUITKU_API_KEY=your_sandbox_api_key
DUITKU_CALLBACK_URL=http://localhost:3000/api/payment-callback
DUITKU_RETURN_URL=http://localhost:3000/success.html
```

4. Jalankan project:

```bash
npm run dev
```

Website akan tersedia di:

```text
http://localhost:3000
```

## Flow Pembayaran

1. User mengisi form order.
2. Klik `Bayar Sekarang`.
3. Frontend mengirim data ke `POST /api/create-payment`.
4. Backend membuat order ID, signature Duitku, menyimpan transaksi `PENDING`, lalu request ke Duitku POP API.
5. Frontend redirect ke `paymentUrl` dari Duitku.
6. Duitku mengirim callback ke `POST /api/payment-callback`.
7. Backend memverifikasi signature callback dan mengubah status order menjadi `PAID`, `PENDING`, atau `FAILED`.
8. User kembali ke `success.html?orderId=...` dan dapat mengirim detail order ke WhatsApp admin.

## Endpoint

### `POST /api/create-payment`

Body:

```json
{
  "customerName": "Nama Customer",
  "customerEmail": "customer@email.com",
  "customerPhone": "08123456789",
  "serviceType": "Coding / Pemrograman",
  "difficulty": "Sedang",
  "deadline": "5 hari",
  "totalPrice": 150000,
  "notes": "Detail tugas"
}
```

Response:

```json
{
  "orderId": "TT-20260518-ABC123",
  "status": "PENDING",
  "paymentUrl": "https://sandbox.duitku.com/...",
  "amount": 150000
}
```

### `POST /api/payment-callback`

Dipanggil oleh Duitku. Signature callback diverifikasi dengan:

```text
MD5(merchantCode + amount + merchantOrderId + apiKey)
```

### `GET /api/orders/:orderId`

Dipakai `success.html` untuk menampilkan detail order dan membuat link WhatsApp otomatis.

## Testing Sandbox Duitku

1. Pastikan `.env` memakai credential sandbox dari dashboard Duitku.
2. Karena callback dari Duitku harus bisa mengakses mesin lokal, gunakan tunnel seperti ngrok atau Cloudflare Tunnel.
3. Contoh ngrok:

```bash
ngrok http 3000
```

4. Ubah `.env`:

```env
DUITKU_CALLBACK_URL=https://your-ngrok-url.ngrok-free.app/api/payment-callback
DUITKU_RETURN_URL=https://your-ngrok-url.ngrok-free.app/success.html
```

5. Restart server.
6. Isi order di website, klik `Bayar Sekarang`, lalu selesaikan pembayaran di halaman Duitku sandbox.
7. Cek `orders.json`; status akan berubah dari `PENDING` menjadi `PAID` jika callback sukses.

## Catatan Keamanan

- API key hanya disimpan di `.env`.
- Frontend tidak pernah menerima API key.
- Callback Duitku diverifikasi memakai signature.
- Input user disanitasi sebelum disimpan.
- `orders.json` cocok untuk tahap awal/sandbox; untuk produksi gunakan database seperti SQLite/PostgreSQL.
