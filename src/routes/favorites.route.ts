import { Router } from 'express';
import favoritesController from '../controllers/favorites.controller';
import { checkUser } from '../middleware/checkUser';

const router = Router();

router.route('/').get(checkUser, favoritesController.get);
router.route('/').post(checkUser, favoritesController.add);
router.route('/').delete(checkUser, favoritesController.deleteFromFavorites);

export default router;
