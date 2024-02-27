import { Router } from 'express';

import { checkUser } from '../middleware/checkUser';

import favoritesController from '../controllers/favorites.controller';

const router = Router();

router.route('/').get(checkUser, favoritesController.get);
router.route('/').post(checkUser, favoritesController.add);
router.route('/').delete(checkUser, favoritesController.deleteFromFavorites);

export default router;
