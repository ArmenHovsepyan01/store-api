import { Request, Response } from 'express';
import paymentService from '../services/payment.service';

async function pay(req: Request, res: Response) {
  try {
    const { products } = req.body;
    const session = await paymentService.pay(products);

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
