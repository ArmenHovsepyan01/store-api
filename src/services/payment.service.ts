import stripe from '../config/stripe';
import { Customer, Order, User } from '../database/models/models';

async function pay(products: any[], user_id: number) {
  try {
    const user = await User.findByPk(user_id);

    const lineItems = products.map((item) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.Product.name,
            images: [`http://localhost:5000/api/images/${item.Product.main_img}`]
          },
          unit_amount: item.Product.price
        },
        quantity: item.quantity
      };
    });

    const customer = await stripe.customers.create({
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      metadata: {
        userId: user.id
      }
    });

    const newCostumer = await Customer.create({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      userId: user.id,
      address: 'Yerevan'
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/payment/success',
      cancel_url: 'http://localhost:3000/payment/cancel',
      customer: customer.id
    });

    await Order.create({
      customerId: newCostumer.id,
      amount: session.amount_total,
      url: session.url,
      status: 'open',
      paid: false
    });

    return session;
  } catch (e) {
    throw new Error(e);
  }
}

export default {
  pay
};
