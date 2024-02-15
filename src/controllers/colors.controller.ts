import { NextFunction, Request, Response } from 'express';

import colorsService from '../services/colors.service';

async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const colors = await colorsService.getAllColors();
    res.status(200).json({
      colors
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
