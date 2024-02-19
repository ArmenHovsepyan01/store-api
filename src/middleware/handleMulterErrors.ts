import { Request, Response, NextFunction } from 'express';
import { MulterError } from 'multer';

export function handleMulterErrors(req: Request, res: Response, next: NextFunction) {
  if (!req.files.length) {
    if (!req.file) {
      return res.status(400).json({
        error: 'Please upload files.'
      });
    }
  }

  next();
}
