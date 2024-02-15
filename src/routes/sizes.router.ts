import { Router } from 'express';
import sizesController from '../controllers/sizes.controller';

const router = Router();

router.route('/').get(sizesController.get);

export default router;
