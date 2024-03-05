import { Router } from 'express';
import { checkUser } from '../middleware/checkUser';
import { validate } from '../middleware/validate';

import addressesController from '../controllers/addresses.controller';

import { validateAddressBody } from '../validators/addressValidator';

const router = Router();

router.route('/').get(checkUser, addressesController.get);
router.route('/').post(checkUser, validate(validateAddressBody), addressesController.create);
router.route('/:id').post(checkUser, addressesController.updateAddress);
router.route('/:id').delete(checkUser, addressesController.deleteAddress);

export default router;
