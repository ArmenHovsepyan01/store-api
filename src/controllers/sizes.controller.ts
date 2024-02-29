import { NextFunction, Request, Response } from 'express';
import sizesService from '../services/sizes.service';

async function get(req: Request, res: Response) {
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

async function create(req: Request, res: Response) {
  try {
    const { size } = req.body;
    const data = await sizesService.createSize(size);

    res.status(200).json({
      message: `Size ${size} created successfully.`,
      data
    });
  } catch (e) {
    res.status(500).json({
      error: e.message
    });
  }
}

async function deleteSize(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const message = await sizesService.deleteSize(+id);

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
  deleteSize
};
