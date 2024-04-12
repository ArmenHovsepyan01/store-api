import stripe from '../config/stripe';
import userService from './user.service';

async function pay(user_id: number, orderId?: number) {
  try {
    const user = await userService.getUserByIdWithCart(user_id);

    // @ts-ignore

    const lineItems = user.Carts.map((item) => {
      return {
        price: item.Product.priceId,
        quantity: item.quantity
      };
    });

    return await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/payment/success',
      cancel_url: 'http://localhost:3000/payment/cancel',
      customer: user.customerId
    });
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
}

export default {
  pay
};
