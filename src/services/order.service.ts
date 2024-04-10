import { Order, OrderProducts } from '../database/models/models';

async function addOrder(
  amount: number,
  userId: number,
  items: { productId: number; quantity: number }[]
) {
  try {
    const order = await Order.create({
      amount,
      userId
    });

    const orderProducts = items.map((item) => ({ ...item, orderId: order.id }));
    await OrderProducts.bulkCreate([...orderProducts]);

    return order;
  } catch (e) {
    throw new Error(e);
  }
}

async function updateOrderStatus(status: 'succeed' | 'failed', id: number) {
  try {
    await Order.update(
      {
        status
      },
      {
        where: {
          id
        }
      }
    );
  } catch (e) {
    throw new Error(e);
  }
}

export default {
  addOrder,
  updateOrderStatus
};
