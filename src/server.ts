import express from 'express';

import dotenv from 'dotenv';

dotenv.config();

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

import emailService from './services/email.service';
import orderService from './services/order.service';
import cartService from './services/cart.service';

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

  console.log(event.type, event);

  switch (event.type) {
    case 'charge.succeeded': {
      const session = event.data.object;
      const customer = await stripe.customers.retrieve(session.customer);

      // @ts-ignore
      const userId = customer.metadata.userId;
      // @ts-ignore
      const orderId = customer.metadata.orderId;

      const emptyCart = await orderService.updateOrderStatus('succeed', orderId);

      if (emptyCart) {
        await cartService.emptyCart(userId);
      }

      await emailService.sendReceiptOrderMail(session.billing_details.email, session.receipt_url);

      break;
    }

    case 'charge.failed': {
      const session = event.data.object;
      const customer = await stripe.customers.retrieve(session.customer);

      // @ts-ignore
      const orderId = customer.metadata.orderId;

      await orderService.updateOrderStatus('failed', orderId);
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
