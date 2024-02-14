import { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';

export async function getAllProductsForAuthUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    await jwt.verify(token, process.env.SECRETKEY);

    req.body.isVerified = true;

    next();
  } catch (e) {
    req.body.isVerified = false;
    next();
  }
}
