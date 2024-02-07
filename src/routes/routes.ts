import { Router } from "express";

import userController from "../controllers/UserController";

import { checkUserCredentials } from "../middleware/checkUserCredentials";

const router = Router();

router.route("/register").get(userController.getAllUsers).post(checkUserCredentials, userController.createUser);
router.route("/verify").get(userController.verifyUser);
router.route("/login").post(checkUserCredentials, userController.login);

export default router;