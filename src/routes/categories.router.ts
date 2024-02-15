import { Router } from 'express';

import categoriesController from '../controllers/categories.controller';

const router = Router();

router.route('/').get(categoriesController.get);

export default router;
