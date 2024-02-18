import { Router } from 'express';

import cartController from '../controllers/cart.controller';

const router = Router();

router
  .route('/')
  .get(cartController.get)
  .post(cartController.update)
  .delete(cartController.deleteFromCart);

export default router;
