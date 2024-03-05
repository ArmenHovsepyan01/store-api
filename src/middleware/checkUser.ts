import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

export async function checkUser(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.headers.authorization) {
      return res.status(400).json({
        error: 'Missing authorization headers.'
      });
    }

    const token = req.headers.authorization.split(' ')[1];
    const info = await jwt.verify(token, process.env.SECRETKEY);

    req.body.user_id = info.id;

    next();
  } catch (e) {
    return res.status(401).json({
      error: 'User access denied.'
    });
  }
}
