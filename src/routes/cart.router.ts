import { Router } from 'express';

import cartController from '../controllers/cart.controller';
import { checkUser } from '../middleware/checkUser';

const router = Router();

router.route('/').get(checkUser, cartController.get).post(checkUser, cartController.update);

router.route('/:id').delete(checkUser, cartController.deleteFromCart);

export default router;
