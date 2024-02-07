import { Request, Response } from 'express';
import userServices from "../services/UserService";

class UserController {
    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await userServices.getAllUsers();
            res.send(users);
        } catch (e) {
            throw new Error(e);
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const newUser = await userServices.createUser(req.body);
            res.status(200).send("User registered successfully.")
        } catch (e) {
            res.status(500).send(`Server error:: ${e}`);
        }
    }

    async verifyUser(req: Request, res: Response) {
        try {
            const message = await userServices.verifyUser(req.query.token);
            /*res.status(200).send({
                message: message,
                location: '/login'
            });*/
            res.status(300).redirect("http://localhost:3000/login");
        } catch (e) {
            res.status(500).send(`Server Error :: ${e}`);
        }
    }

    async login(req: Request, res: Response) {
        try {
            const {email, password} = req.body;
            const info = await userServices.loginUser(email, password);

            res.status(200).send(info);
        } catch (e) {
            console.log(e.message);
            res.status(400).send(e.message);
        }
    }

    async auth(req: Request, res: Response) {
        try {
            // const user = await
        } catch (e) {
            res.status(400).json(e);
        }
    }
}

export default new UserController();