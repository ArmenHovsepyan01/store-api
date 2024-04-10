import stripe from '../config/stripe';
import { Addresses, Cart, Product, User } from '../database/models/models';
import { AddressesOutput } from '../database/models/addresses';
import orderService from './order.service';

async function pay(user_id: number) {
  try {
    const user = await User.findByPk(user_id, {
      include: [
        {
          model: Addresses,
          as: 'addresses',
          where: {
            isDefault: true
          }
        },
        {
          model: Cart,
          include: [
            {
              model: Product
            }
          ]
        }
      ]
    });

    // @ts-ignore
    const userAddress = user.addresses[0] as AddressesOutput;

    // @ts-ignore
    const lineItems = user.Carts.map((item) => {
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

    const customer = await stripe.customers.list({ email: user.email });

    // @ts-ignore
    const orderProducts = user.Carts.map((product) => ({
      productId: product.Product.id,
      quantity: product.quantity
    }));

    const total = lineItems.reduce((aggr, item) => {
      return item.price_data.unit_amount + aggr;
    }, 0);

    console.log(total);

    const order = await orderService.addOrder(total, user.id, orderProducts);

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
      // change orderId
      await stripe.customers.update(customer.data[0].id, {
        metadata: {
          orderId: order.id
        }
      });

      customerId = customer.data[0].id;
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/payment/success',
      cancel_url: 'http://localhost:3000/payment/cancel',
      customer: customerId
    });

    return session;
  } catch (e) {
    throw new Error(e);
  }
}

export default {
  pay
};
