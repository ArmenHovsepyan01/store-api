import { Categories } from '../database/models/models';
import { CategoriesOutput } from '../database/models/categories';

async function getAllCategories(): Promise<CategoriesOutput[]> {
  try {
    return await Categories.findAll();
  } catch (e) {
    throw new Error(e);
  }
}

export default {
  getAllCategories
};
