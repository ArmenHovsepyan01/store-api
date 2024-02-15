import { Router } from 'express';

import userController from '../controllers/user.controller';

import { validate } from '../middleware/validate';

import { checkUser } from '../middleware/checkUser';

import { validateRegisterFields } from '../validators/registrationValidator';
import { validateLoginFields } from '../validators/loginValidator';

const router = Router();

router.route('/register').post(validate(validateRegisterFields), userController.register);

router.route('/verify').get(userController.verify);

router.route('/login').post(validate(validateLoginFields), userController.login);

router.route('/auth').get(checkUser, userController.auth);

export default router;
