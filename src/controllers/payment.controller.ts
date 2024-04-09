import { Request, Response } from 'express';
import paymentService from '../services/payment.service';
import user from '../database/models/user';

async function pay(req: Request, res: Response) {
  try {
    const { products, user_id } = req.body;

    const session = await paymentService.pay(products, user_id);

    res.json({
      message: 'Successful request.',
      data: { sessionId: session.id }
    });
  } catch (e) {
    res.status(500).json({
      message: `Something gone wrong ${e}`
    });
  }
}

export default {
  pay
};
