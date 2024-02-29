import { NextFunction, Request, Response } from 'express';

import colorsService from '../services/colors.service';

async function get(req: Request, res: Response) {
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

async function create(req: Request, res: Response) {
  try {
    const { color } = req.body;
    const data = await colorsService.createColor(color);

    res.status(200).json({
      message: `Color ${color} created successfully.`,
      data
    });
  } catch (e) {
    res.status(500).json({
      error: e.message
    });
  }
}

async function deleteColor(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const message = await colorsService.deleteColor(+id);

    res.status(200).json({
      message
    });
  } catch (e) {
    res.status(500).json({
      error: e.message
    });
  }
}

export default {
  get,
  create,
  deleteColor
};
