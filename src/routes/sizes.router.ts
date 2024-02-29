import { Router } from 'express';
import { checkAdmin } from '../middleware/checkAdmin';

import sizesController from '../controllers/sizes.controller';

const router = Router();

router.route('/').get(sizesController.get);
router.route('/').post(checkAdmin, sizesController.create);
router.route('/:id').delete(checkAdmin, sizesController.deleteSize);

export default router;
