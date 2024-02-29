import { NextFunction, Request, Response } from 'express';
import { User } from '../database/models/models';
import { UserRoles } from '../enums';

import jwt from 'jsonwebtoken';

export async function checkAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.headers.authorization) {
      return res.status(400).json({
        error: 'Missing authorization headers.'
      });
    }

    const token = req.headers.authorization.split(' ')[1];
    const info = await jwt.verify(token, process.env.SECRETKEY);

    const admin = await User.findByPk(info.id);

    if (admin.role !== UserRoles.ADMIN)
      return res.status(401).json({
        error: "Admin privileges don't allowed."
      });

    req.body.admin = UserRoles.ADMIN;

    next();
  } catch (e) {
    throw new Error(e);
  }
}
