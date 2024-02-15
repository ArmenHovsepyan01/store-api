import { Router } from 'express';

import productRouter from './product.router';
import userRouter from './user.router';
import colorsRouter from './colors.router';
import sizesRouter from './sizes.router';
import categoriesRouter from './categories.router';

const router = Router();

router.use('/', productRouter);
router.use('/users', userRouter);

router.use('/colors', colorsRouter);
router.use('/sizes', sizesRouter);
router.use('/categories', categoriesRouter);

export default router;
