import { Router } from 'express';

import productRouter from './product.router';
import userRouter from './user.router';
import colorsRouter from './colors.router';
import sizesRouter from './sizes.router';
import categoriesRouter from './categories.router';
import cartRouter from './cart.router';
import favoritesRoute from './favorites.route';
import addressesRoute from './addresses.route';
import paymentRoute from './payment.route';
import { checkUser } from '../middleware/checkUser';
import orderRoute from './order.route';

const router = Router();

router.use('/', productRouter);
router.use('/users', userRouter);

router.use('/cart', cartRouter);

router.use('/colors', colorsRouter);
router.use('/sizes', sizesRouter);
router.use('/categories', categoriesRouter);

router.use('/favorites', favoritesRoute);

router.use('/addresses', addressesRoute);

router.use('/payment', checkUser, paymentRoute);

router.use('/orders', checkUser, orderRoute);

export default router;
