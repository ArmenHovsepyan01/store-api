import { Request, Response, NextFunction } from 'express';
import favoritesService from '../services/favorites.service';

async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const { user_id } = req.body;
    const data = await favoritesService.getAll(user_id);
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({
      error: e.message
    });
  }
}

async function add(req: Request, res: Response) {
  try {
    const { user_id, product_id, decrease } = req.body;
    const data = await favoritesService.addToFavorites(user_id, product_id, decrease);

    res.status(200).json({
      message: `Product ${decrease ? 'removed' : 'added'} successfully.`,
      data
    });
  } catch (e) {
    res.status(500).json({});
  }
}

async function deleteFromFavorites(req: Request, res: Response) {
  try {
    const { id } = req.body;
    const data = await favoritesService.deleteFromFavorites(id);
    res.status(200).json({
      message: 'Product removed from favorites successfully.',
      data
    });
  } catch (e) {
    res.status(500).json({
      error: e.message
    });
  }
}

export default {
  get,
  add,
  deleteFromFavorites
};
