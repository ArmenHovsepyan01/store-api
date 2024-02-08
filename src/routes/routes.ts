import { Router } from "express";

import userController from "../controllers/UserController";

import { validateRegisterFields } from "../validators/registrationValidator";
import { validateLoginFields } from "../validators/loginValidator";
import { checkUser } from "../middleware/checkUser";
import productController from "../controllers/ProductController";
import product from "../models/Product";

const router = Router();

router.route("/register").post(validateRegisterFields, userController.createUser);

router.route("/verify").get(userController.verifyUser);

router.route("/login").post(validateLoginFields, userController.login);

router.route('/auth').get(checkUser, userController.auth);

router.route('/product').post(productController.createProduct);

router.route("/product/:id").get(productController.getProductById);

export default router;