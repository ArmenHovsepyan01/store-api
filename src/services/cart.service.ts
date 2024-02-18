import { Cart, Product } from '../database/models/models';
import product from '../database/models/product';

async function getAll(user_id: number) {
  try {
    return await Cart.findAll({
      where: {
        id: user_id
      },
      include: [
        {
          model: Product
        }
      ]
    });
  } catch (e) {
    throw new Error(e);
  }
}

async function addToCart(product_id: number, user_id: number) {
  try {
    const cartProduct = await Cart.findOne({
      where: {
        user_id,
        product_id
      }
    });

    if (cartProduct) {
      return await Cart.update(
        {
          quantity: cartProduct.quantity + 1
        },
        {
          where: {
            id: cartProduct.id
          }
        }
      );
    }

    return await Cart.create({
      product_id,
      user_id
    });
  } catch (e) {
    throw new Error(e);
  }
}

async function deleteFromCart(id: number) {
  try {
    return await Cart.destroy({
      where: {
        id
      }
    });
  } catch (e) {
    throw new Error(e);
  }
}

export default {
  getAll,
  addToCart,
  deleteFromCart
};
