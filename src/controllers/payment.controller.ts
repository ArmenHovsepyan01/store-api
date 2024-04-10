import { Request, Response } from 'express';
import paymentService from '../services/payment.service';

async function pay(req: Request, res: Response) {
  try {
    const { user_id } = req.body;

    const session = await paymentService.pay(user_id);

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
