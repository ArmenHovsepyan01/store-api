const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const express = require('express');
const app = express();

const endpointSecret = 'whsec_f955180bfc44cdf9cd9a9a8449bc322e898254cbe16085e7be4e4bfdc7c73ead';

app.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case 'charge.succeeded':
      console.log(event.type, '\n', event.data.object.paid);
      // get from event.data.object paid, customer, status
      break;
    case 'charge.failed':
      console.log(event.type, '\n', event);
      break;
    default:
      console.log(event.type);
  }

  response.send();
});

app.listen(4242, () => console.log('Running on port 4242'));
