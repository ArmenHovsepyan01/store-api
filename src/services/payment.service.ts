import stripe from '../config/stripe';

async function pay(products: any[]) {
  try {
    const lineItems = products.map((item) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.Product.name,
            images: [`http://localhost:5000/api/images/${item.Product.main_img}`]
          },
          unit_amount: item.Product.price * 100
        },
        quantity: item.quantity
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/payment/success',
      cancel_url: 'http://localhost:3000/payment/cancel'
    });

    return session;
  } catch (e) {
    throw new Error(e);
  }
}

export default {
  pay
};
