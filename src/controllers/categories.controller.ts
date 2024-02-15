import { NextFunction, Request, Response } from 'express';
import categoriesService from '../services/categories.service';
import categories from '../database/models/categories';

async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const categories = await categoriesService.getAllCategories();
    res.status(200).json({
      categories
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
