import multer from 'multer';
import { NextFunction, Request, Response } from 'express';

export const unsupportedFileMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const upload = multer({ storage: multer.memoryStorage() }); // Use memory storage

  upload.any()(req, res, (err) => {
    if (err) {
      const isUnsupportedError =
        err.code === 'LIMIT_UNEXPECTED_FILE' || // Check for generic unsupported file
        err.message.includes('unsupported file type'); // Or check for specific message
      res.status(400).json({ error: 'Unsupported file type or incomplete form submission' });
      if (isUnsupportedError) {
        res.status(400).json({ error: 'Unsupported file type(s) found' });
      } else {
        next(err); // Pass other errors to next middleware
      }
    } else {
      next();
    }

    console.log(req.files);
    // Continue to next middleware for supported files
  });
};
