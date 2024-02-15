import { NextFunction, Request, Response } from 'express';
import sizesService from '../services/sizes.service';

async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const sizes = await sizesService.getAllSizes();
    res.status(200).json({
      sizes
    });
  } catch (e) {
    res.status(500).json({
      error: e.message
    });
  }
}

export default {
  get
};
