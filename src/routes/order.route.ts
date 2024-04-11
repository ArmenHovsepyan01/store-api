import { Router } from 'express';
import orderController from '../controllers/order.controller';

const router = Router();

router.route('/').get(orderController.get);

export default router;
