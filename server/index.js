const express = require('express');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use((req,res,next)=>{ res.setHeader('Access-Control-Allow-Origin','*'); res.setHeader('Access-Control-Allow-Headers','Content-Type'); next(); });

const rzp = new Razorpay({
  key_id: process.env.RZP_KEY_ID || 'rzp_test_KEY',
  key_secret: process.env.RZP_KEY_SECRET || 'rzp_test_SECRET'
});

app.post('/create-order', async (req, res) => {
  try {
    const { amount, currency='INR', receipt='rcpt_'+Date.now() } = req.body;
    const order = await rzp.orders.create({ amount, currency, receipt, payment_capture: 1 });
    res.json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, error: err.message });
  }
});

app.post('/webhook', (req, res) => {
  const webhookSecret = process.env.RZP_WEBHOOK_SECRET || 'your_webhook_secret';
  const body = JSON.stringify(req.body);
  const expectedSignature = crypto.createHmac('sha256', webhookSecret).update(body).digest('hex');
  const signature = req.headers['x-razorpay-signature'];
  if (signature === expectedSignature) {
    console.log('Verified webhook:', req.body.event);
    res.json({ status: 'ok' });
  } else {
    console.warn('Invalid signature for webhook');
    res.status(400).json({ error: 'Invalid signature' });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, ()=> console.log(`Razorpay demo server running on ${port}`));
