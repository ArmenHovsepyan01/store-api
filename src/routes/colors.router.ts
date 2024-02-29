import { Router } from 'express';
import { checkAdmin } from '../middleware/checkAdmin';
import colorsController from '../controllers/colors.controller';

const router = Router();

router.route('/').get(colorsController.get);
router.route('/').post(checkAdmin, colorsController.create);
router.route('/:id').delete(checkAdmin, colorsController.deleteColor);

export default router;
