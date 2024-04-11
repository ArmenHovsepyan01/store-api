import stripe from '../config/stripe';
import orderService from './order.service';
import userService from './user.service';

async function pay(user_id: number, orderId?: number) {
  try {
    const user = await userService.getUserByIdWithCart(user_id);

    const userAddress = user?.addresses[0];

    if (!userAddress) throw new Error('Please set your address then do order.');

    let lineItems;
    let order;

    const customer = await stripe.customers.list({ email: user.email });

    if (!orderId) {
      // @ts-ignore
      const orderProducts = user.Carts.map((item) => ({
        productId: item.Product.id,
        quantity: item.quantity
      }));

      // @ts-ignore
      lineItems = user.Carts.map((item) => {
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

      const total = lineItems.reduce((aggr, item) => {
        return item.price_data.unit_amount * item.quantity + aggr;
      }, 0);

      order = await orderService.addOrder(total, user.id, orderProducts);
    } else {
      order = await orderService.getOrderById(orderId);

      lineItems = order.products.map((item) => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.dataValues.name,
              images: [`http://localhost:5000/api/images/${item.dataValues.main_img}`]
            },
            unit_amount: item.dataValues.price * 100
          },
          quantity: item.dataValues.OrderProducts.quantity
        };
      });
    }

    let customerId;

    if (customer.data.length === 0) {
      const newCostumer = await stripe.customers.create({
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        address: {
          state: userAddress.state,
          postal_code: userAddress.zip_code,
          city: userAddress.city,
          country: userAddress.country,
          line1: userAddress.street_address
        },
        metadata: {
          userId: user.id,
          orderId: order.id
        }
      });

      customerId = newCostumer.id;
    } else {
      await stripe.customers.update(customer.data[0].id, {
        metadata: {
          orderId: order.id
        }
      });

      customerId = customer.data[0].id;
    }

    return await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/payment/success',
      cancel_url: 'http://localhost:3000/payment/cancel',
      customer: customerId
    });
  } catch (e) {
    throw new Error(e);
  }
}

export default {
  pay
};
