import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';
import { User } from '../database/models/models';

export async function checkUser(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const info = await jwt.verify(token, process.env.SECRETKEY);

    const user = await User.findOne({
      where: {
        email: info.email
      }
    });

    if (!user) throw new Error('User access denied.');

    req.body.email = info.email;

    next();
  } catch (e) {
    throw new Error(e);
  }
}
