const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const PaymentModel = require('./paymentModel');
const PaidVideoModel = require('./paidVideoModel');

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Webhook endpoint
router.post('/', (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch {
    return res.status(400).send('Webhook signature verification failed.');
  }

  // Handle successful payment
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const user_id = paymentIntent.metadata?.user_id;
    let selections = [];

    try {
      selections = JSON.parse(paymentIntent.metadata?.selections || '[]');
    } catch {
      selections = [];
    }

    // Mark videos as paid
    if (user_id && Array.isArray(selections)) {
      selections.forEach(async (sel) => {
        if (sel.language && sel.level) {
          try {
            await PaidVideoModel.markPaid(user_id, sel.language, sel.level);
          } catch {
            // Fail silently in production
          }
        }
      });
    }

    // Save payment info
    PaymentModel.save({
      stripe_session_id: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      course_type: paymentIntent.metadata?.courseType || null,
      status: paymentIntent.status,
    }).catch(() => {
      // Fail silently in production
    });
  }

  res.status(200).json({ received: true });
});

module.exports = router;
