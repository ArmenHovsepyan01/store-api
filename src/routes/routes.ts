import { Router } from "express";

import userController from "../controllers/UserController";

import { validateRegisterFields } from "../validators/registrationValidator";
import { validateLoginFields } from "../validators/loginValidator";

const router = Router();

router.route("/register")
    .get(userController.getAllUsers)
    .post(validateRegisterFields, userController.createUser);

router.route("/verify").get(userController.verifyUser);

router.route("/login").post(validateLoginFields, userController.login);

export default router;