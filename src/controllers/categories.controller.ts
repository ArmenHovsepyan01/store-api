import { Request, Response } from 'express';
import categoriesService from '../services/categories.service';
import CategoriesService from '../services/categories.service';

async function get(req: Request, res: Response) {
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

async function create(req: Request, res: Response) {
  try {
    const { category } = req.body;

    const data = await CategoriesService.createCategory(category);

    res.status(200).json({
      message: `Category ${category} created successfully.`,
      data
    });
  } catch (e) {
    res.status(500).json({
      error: e.message
    });
  }
}

async function deleteCategory(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const message = await categoriesService.deleteCategory(+id);

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
  deleteCategory
};
