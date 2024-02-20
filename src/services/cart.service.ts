import { Cart, Product } from '../database/models/models';

async function getAll(user_id: number) {
  try {
    return await Cart.findAll({
      where: {
        user_id: user_id
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

async function addToCart(product_id: number, user_id: number, decrease?: boolean) {
  try {
    const cartProduct = await Cart.findOne({
      where: {
        user_id,
        product_id
      }
    });

    if (cartProduct) {
      const newQuantity = decrease
        ? cartProduct.quantity > 1
          ? cartProduct.quantity - 1
          : cartProduct.quantity
        : cartProduct.quantity + 1;
      await Cart.update(
        {
          quantity: newQuantity
        },
        {
          where: {
            id: cartProduct.id
          }
        }
      );

      return await Cart.findByPk(cartProduct.id, {
        include: [
          {
            model: Product
          }
        ]
      });
    }

    const cartItem = await Cart.create({
      product_id,
      user_id
    });
    const product = await Product.findByPk(cartItem.product_id);

    return {
      ...cartItem.dataValues,
      Product: product
    };
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
