import { Router } from 'express';
import colorsController from '../controllers/colors.controller';

const router = Router();

router.route('/').get(colorsController.get);

export default router;
