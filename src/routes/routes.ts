import { Router } from "express";

import userController from "../controllers/UserController";

import { validateRegisterFields } from "../validators/registrationValidator";
import { validateLoginFields } from "../validators/loginValidator";
import { checkUser } from "../middleware/checkUser";
import productController from "../controllers/ProductController";
import {validateProductCreateBody} from "../validators/createProductValidator";

import multer from "multer";

import path from "node:path";

const router = Router();

const imagesFolderPath = path.resolve(__dirname, "../../images");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imagesFolderPath);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}` + ext);
    }
});

const upload = multer({ storage: storage });

router.route("/register").post(validateRegisterFields, userController.createUser);

router.route("/verify").get(userController.verifyUser);

router.route("/login").post(validateLoginFields, userController.login);

router.route('/auth').get(checkUser, userController.auth);

router.route('/product').post(upload.any(), productController.createProduct);

router.route('/upload').post(upload.any(), productController.upload);

router.route("/product/:id").get(productController.getProductById);

export default router;