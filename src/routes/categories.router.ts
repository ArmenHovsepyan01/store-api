import { Router } from 'express';

import categoriesController from '../controllers/categories.controller';
import { checkAdmin } from '../middleware/checkAdmin';

const router = Router();

router.route('/').get(categoriesController.get);
router.route('/').post(checkAdmin, categoriesController.create);
router.route('/:id').delete(checkAdmin, categoriesController.deleteCategory);

export default router;
