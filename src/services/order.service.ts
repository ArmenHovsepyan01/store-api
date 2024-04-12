import { Order, OrderProducts, Product, User } from '../database/models/models';
import { Op } from 'sequelize';
import { getQuantityForOrders } from '../helpers/getQuantitiyForOrders';

async function addOrder(
  amount: number,
  userId: number,
  items: { productId: number; quantity: number }[],
  payment_intent: string
) {
  try {
    const order = await Order.create({
      amount,
      userId,
      payment_intent
    });

    const orderProducts = items.map((item) => ({ ...item, orderId: order.id }));
    await OrderProducts.bulkCreate([...orderProducts]);

    return order;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
}

async function updateOrderStatus(status: 'succeed' | 'failed', id: number) {
  try {
    await Order.update(
      {
        status,
        paid: true
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

async function getAll(userId: number) {
  try {
    const orders = await Order.findAll({
      where: {
        userId,
        status: {
          [Op.in]: ['failed', 'succeed']
        }
      },
      include: [
        {
          model: Product,
          as: 'products',
          through: {
            attributes: ['quantity']
          }
        }
      ]
    });

    return getQuantityForOrders(orders);
  } catch (e) {
    throw new Error(e);
  }
}
async function getOrderById(orderId: number) {
  try {
    const order = await Order.findByPk(orderId, {
      include: [
        {
          model: Product,
          as: 'products',
          through: {
            attributes: ['quantity']
          }
        }
      ]
    });

    return order;
  } catch (e) {
    throw new Error(e);
  }
}

async function checkUserOrders(payment_intent: string, userId: string) {
  try {
    return await Order.findOne({
      where: {
        userId,
        payment_intent
      }
    });
  } catch (e) {
    throw new Error(e);
  }
}

export default {
  addOrder,
  updateOrderStatus,
  getAll,
  getOrderById,
  checkUserOrders
};
