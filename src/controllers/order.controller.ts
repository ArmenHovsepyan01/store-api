import { Request, Response } from 'express';
import orderService from '../services/order.service';

async function get(req: Request, res: Response) {
  try {
    const { user_id } = req.body;

    const orders = await orderService.getAll(user_id);

    res.json({
      message: 'Got all orders for user successfully.',
      data: orders
    });
  } catch (e) {
    res.status(500).json({
      message: `Something gone wrong:: ${e}`
    });
  }
}

export default {
  get
};
