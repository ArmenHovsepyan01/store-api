import { Router } from "express";

import multer from "multer";

import userController from "../controllers/user.controller";
import productController from "../controllers/product.controller";

import { validateRegisterFields } from "../validators/registrationValidator";
import { validateLoginFields } from "../validators/loginValidator";
import { validateProductCreateBody } from "../validators/createProductValidator";

import { checkUser } from "../middleware/checkUser";

import { getAllProductsForAuthUsers } from "../middleware/getAllProductsForAuthUsers";

import storage from "../config/multerStorage";

import { validate } from "../middleware/validate";

const router = Router();

const upload = multer({ storage: storage });

router
  .route("/register")
  .post(validate(validateRegisterFields), userController.create);

router.route("/verify").get(userController.verify);

router
  .route("/login")
  .post(validate(validateLoginFields), userController.login);

router.route("/auth").get(checkUser, userController.auth);

router
  .route("/product")
  .post(
    upload.any(),
    validate(validateProductCreateBody),
    productController.create,
  );

router
  .route("/products")
  .get(getAllProductsForAuthUsers, productController.get);

router
  .route("/product/:id")
  .get(productController.getById)
  .delete(productController.delete)
  .put(productController.update);

export default router;
