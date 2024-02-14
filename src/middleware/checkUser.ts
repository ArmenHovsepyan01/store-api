import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

export async function checkUser(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const info = await jwt.verify(token, process.env.SECRETKEY);

    req.body.email = info.email;

    next();
  } catch (e) {
    throw new Error(e);
  }
}
