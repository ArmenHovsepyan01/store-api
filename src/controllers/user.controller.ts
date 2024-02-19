import { Request, Response } from 'express';

import userServices from '../services/user.service';
import { log } from 'node:console';

async function register(req: Request, res: Response) {
  try {
    await userServices.createUser(req.body);
    res.status(200).send('User registered successfully.');
  } catch (e) {
    res.status(500).json({
      error: e.message
    });
  }
}

async function verify(req: Request, res: Response) {
  try {
    const message = await userServices.verifyUser(req.query.token);
    log(message);
    res.status(300).redirect('http://localhost:3000/login');
  } catch (e) {
    res.status(500).json({
      error: e.message
    });
  }
}

async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const info = await userServices.loginUser(email, password);

    res.status(200).send(info);
  } catch (e) {
    res.status(400).json({
      error: e.message
    });
  }
}

async function auth(req: Request, res: Response) {
  try {
    const { user_id } = req.body;
    const user = await userServices.getUser(user_id);

    res.status(200).json(user);
  } catch (e) {
    res.status(401).json({
      error: e.message
    });
  }
}

export default {
  register,
  verify,
  login,
  auth
};
