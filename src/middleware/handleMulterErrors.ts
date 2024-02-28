import multer from 'multer';
import { NextFunction, Request, Response } from 'express';
import path from 'path';

export const unsupportedFileMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const upload = multer({ storage: multer.memoryStorage() });
  let unsupportedFile = false;
  upload.any()(req, res, (err) => {
    (req.files as Express.Multer.File[]).forEach((file) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp|avif)$/)) {
        unsupportedFile = true;
        return;
      }
    });

    if (unsupportedFile) {
      return res.status(400).json({ error: `Unsupported file type.` });
    }

    next();
  });
};
