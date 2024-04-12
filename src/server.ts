import express from 'express';

import dotenv from 'dotenv';

dotenv.config();

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

import emailService from './services/email.service';
import orderService from './services/order.service';

const app = express();

const endpointSecret = process.env.ENDPOINT_SECRET;

app.post('/webhook', express.raw({ type: 'application/json' }), async (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case 'charge.succeeded': {
      const session = event.data.object;

      const { products, userId, amount, orderId } = session.metadata;

      const existingOrder = await orderService.checkUserOrders(session.payment_intent, userId);

      await emailService.sendReceiptOrderMail(session.billing_details.email, session.receipt_url);

      if (orderId) await orderService.updateOrderStatus('succeed', orderId);

      if (existingOrder) {
        await orderService.updateOrderStatus('succeed', existingOrder.id);
      } else {
        if (!orderId)
          await orderService.addOrder(
            +amount,
            +userId,
            JSON.parse(products),
            session.payment_intent
          );
      }

      break;
    }

    case 'charge.failed': {
      const session = event.data.object;

      const { products, userId, amount } = session.metadata;

      const existingOrder = await orderService.checkUserOrders(session.payment_intent, userId);

      if (!existingOrder) {
        await orderService.addOrder(+amount, +userId, JSON.parse(products), session.payment_intent);
      }

      await emailService.sendFailedPaymentMail(
        session.failure_message,
        session.billing_details.email
      );
      break;
    }
  }

  response.send();
});

app.listen(4242, () => console.log('Running on port 4242'));
