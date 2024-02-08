import { Request, Response } from 'express';

import userServices from "../services/UserService";

import { validationResult } from "express-validator";

class UserController {
    async createUser(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            await userServices.createUser(req.body);
            res.status(200).send("User registered successfully.")
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async verifyUser(req: Request, res: Response) {
        try {
            const message = await userServices.verifyUser(req.query.token);
            res.status(300).redirect("http://localhost:3000/login");
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const {email, password} = req.body;
            const info = await userServices.loginUser(email, password);

            res.status(200).send(info);
        } catch (e) {
            res.status(400).json({
                error: e.message
            });
        }
    }

    async auth(req: Request, res: Response) {
        try {
            const { email } = req.body;
            const user = await userServices.getUser(email);

            console.log(user);
            res.status(200).json(user);
        } catch (e) {
            res.status(400).json({
                error: e.message
            });
        }
    }
}

export default new UserController();