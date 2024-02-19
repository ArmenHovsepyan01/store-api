import { Request, Response } from 'express';
import cartService from '../services/cart.service';

async function get(req: Request, res: Response) {
  try {
    const { user_id } = req.body;

    const cartProducts = await cartService.getAll(user_id);

    res.status(200).json(cartProducts);
  } catch (e) {
    res.status(500).json({
      error: e.message
    });
  }
}

async function update(req: Request, res: Response) {
  try {
    const { product_id, user_id, decrease } = req.body;
    const cartProduct = await cartService.addToCart(product_id, user_id, decrease);

    res.status(200).json(cartProduct);
  } catch (e) {
    res.status(500).json({
      error: e.message
    });
  }
}

async function deleteFromCart(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await cartService.deleteFromCart(+id);

    res.status(200).json({
      message: `Product by id ${id} successfully removed from cart.`
    });
  } catch (e) {
    res.status(500).json({
      error: e.message
    });
  }
}

export default {
  get,
  update,
  deleteFromCart
};
